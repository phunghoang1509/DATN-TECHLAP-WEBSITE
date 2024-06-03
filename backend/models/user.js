import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng nhập tên của bạn!"],
      maxLength: [50, "Không được vượt quá 50 ký tự!"],
      validate: {
        validator: function (value) {
          return !/^\s|\s$/.test(value);
        },
        message: "Tên người dùng không được chứa khoảng trắng",
      },
    },
    email: {
      type: String,
      required: [true, "Vui lòng nhập email của bạn!"],
      unique: true,
      validate: {
        validator: function (value) {
          return (
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && /.com$/.test(value)
          );
        },
        message: "Email không hợp lệ",
      },
    },
    password: {
      type: String,
      required: [true, "Vui lòng nhập mật khẩu của bạn!"],
      minLength: [6, "Password phải từ 6 ký tự trở lên"],
      select: false,
      validate: {
        validator: function (value) {
          return !/\s/.test(value);
        },
        message: "Mật khẩu không được chứa khoảng trắng",
      },
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "user",
    },
    status: {
      type: String,
      default: "active",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

//mã hóa mật khẩu trước khi lưu người dùng
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcryptjs.hash(this.password, 10);
});

// Trả lại mã thông báo JWT
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

//ss mk user
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

//Tạo mã thông báo đặt lại mật khẩu
userSchema.methods.getResetPasswordToken = function () {
  //Tạo mã thông báo
  const resetToken = crypto.randomBytes(20).toString("hex");
  //đặt lại mã thông báo mật khẩu
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  //Đặt thời gian hết hạn mã thông báo
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
  return resetToken;
};
export default mongoose.model("User", userSchema);
