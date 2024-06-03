import catchAsyncErrors from "./catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

// kiểm tra ng dùng có xác thực k
export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Đăng nhập trước khi thay đổi", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);

  next();
});

// role user
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) Không được phép thay đổi`,
          403
        )
      );
    }

    next();
  };
};
