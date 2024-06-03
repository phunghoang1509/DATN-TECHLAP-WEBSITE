import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng nhập tên sản phẩm"],
      maxLength: [200, "Tên sản phẩm không quá 200 ký tự"],
    },
    slug: {
      type: String,
      required: [true, "Vui lòng nhập slug"],
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export default mongoose.model("Category", categorySchema);
