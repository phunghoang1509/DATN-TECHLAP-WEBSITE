import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

import User from "../models/user.js";
import { delete_file, upload_file } from "../utils/cloudinary.js";
import { getResetPasswordTemPlates } from "../utils/emailTemplates.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendEmail from "../utils/sendEmail.js";
import sendToken from "../utils/sendToken.js";
import crypto from "crypto";

// dky user  => /api/v1/register
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  sendToken(user, 201, res);
});

// dangnhap user  => /api/v1/login
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Phải điền email & mật khẩu!", 400));
  }

  //tìm kiếm user trong database
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Email hoặc mật khẩu không hợp lệ!", 401));
  }
  if (user.status === "deactive") {
    return next(
      new ErrorHandler(
        "Tài khoản của bạn đã bị chặn. Vui lòng liên hệ quản trị viên.",
        401
      )
    );
  }
  //ktra mk
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Email hoặc mật khẩu không hợp lệ!", 401));
  }

  sendToken(user, 200, res);
});

// dangxuat user  => /api/v1/logout
export const logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    message: "Đã đăng xuất",
  });
});

// cập nhật avatar user  => /api/v1/me/upload_avatar
export const uploadAvatar = catchAsyncErrors(async (req, res, next) => {
  const avatarResponse = await upload_file(req.body.avatar, "shopit/avatars");

  //remove previous avatar
  if (req?.user?.avatar?.url) {
    await delete_file(req?.user?.avatar?.public_id);
  }
  const user = await User.findByIdAndUpdate(req?.user?._id, {
    avatar: avatarResponse,
  });

  res.status(200).json({
    user,
  });
});

// Quên mật khẩu  => /api/v1/password/forgot
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  //tìm kiếm user trong database
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ErrorHandler("Không tìm thấy người dùng với email này!", 404)
    );
  }

  //dặt lại mk
  const resetToken = user.getResetPasswordToken();

  await user.save();

  //gửi khôi phục mk

  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = getResetPasswordTemPlates(user?.name, resetUrl);
  try {
    await sendEmail({
      email: user.email,
      subject: "Khôi phục mật khẩu Techlap",
      message,
    });

    res.status(200).json({
      message: `Email đã được gửi đến: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    return next(new ErrorHandler(error?.message, 500));
  }
  sendToken(user, 200, res);
});

// đặt lại mk mới   =>  /api/v1/password/reset/:token
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Hash the URL Token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Mã thông báo đặt lại mật khẩu không hợp lệ hoặc đã hết hạn!",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Mật khẩu không khớp", 400));
  }

  // đặtlại mk mới
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

//nhận hồ sô người dùng => /api/v1/me
export const getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req?.user?._id);
  res.status(200).json({
    user,
  });
});

//cập nhật mk => /api/v1/password/update
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  try {
    const userId = req?.user?._id;
    if (!userId) {
      throw new ErrorHandler("Người dùng không tồn tại!", 400);
    }

    // Tìm người dùng bằng ID,MKhau
    const user = await User.findById(userId).select("+password");

    // ktra người dùng tồn tại k
    if (!user) {
      throw new ErrorHandler("Người dùng không tồn tại!", 404);
    }

    // ktra lại mk
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
      throw new ErrorHandler("Mật khẩu cũ không đúng!", 400);
    }

    // Update mk mới
    user.password = req.body.password;

    // Lưu người dùng
    await user.save();

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});

//cập nhật thông tin người dùng => /api/v1/me/update

export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng cung cấp tên và email." });
    }

    const userId = req.user._id;

    // kta xem người dùng có tồn tại không
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Người dùng không tồn tại!" });
    }

    // cập nhật thông tin
    user.name = name;
    user.email = email;
    const updatedUser = await user.save();

    //  thông tin người dùng đã cập nhật
    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Thông tin cá nhân điền chưa đúng:", error);
    res
      .status(500)
      .json({ success: false, message: "Thông tin cá nhân điền chưa đúng" });
  }
});

// Nhận tất cả người dùng - ADMIN  =>  /api/v1/admin/users
export const allUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    users,
  });
});

// Nhận thông tin chi tiết người dùng - ADMIN  =>  /api/v1/admin/users/:id
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`Không tìm thấy người dùng có id: ${req.params.id}`, 400)
    );
  }
  res.status(200).json({
    user,
  });
});

//cập nhật thông tin chi tiết người dùng - ADMIN => /api/v1/admin/users/:id
export const updateUser = catchAsyncErrors(async (req, res, next) => {
  try {
    // Kiểm tra xem có thông tin mới của người dùng không
    const { name, email, role } = req.body;
    if (!name || !email || !role) {
      return res.status(400).json({
        success: false,
        message: "Tên, email và vai trò là bắt buộc",
      });
    }

    // kt xem id của người dùng
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }

    // cập nhật user
    user.name = name;
    user.email = email;
    user.role = role;

    await user.save();

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// delete user - ADMIN  =>  /api/v1/admin/users/:id
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`Không tìm thấy người dùng có id: ${req.params.id}`, 400)
    );
  }

  // TODO - Remove user avatar from cloudinary
  await user.deleteOne();
  res.status(200).json({
    success: true,
  });
});

//cập nhật status người dùng - ADMIN => /api/v1/admin/users/status/:id
export const updateStatusUser = catchAsyncErrors(async (req, res, next) => {
  try {
    // Kiểm tra xem có thông tin mới của người dùng không
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Trạng thái người dùng là bắt buộc",
      });
    }

    // kt xem id của người dùng
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }

    // cập nhật user
    user.status = status;

    await user.save();

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
