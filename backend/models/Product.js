import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng nhập tên sản phẩm"],
      maxLength: [200, "Tên sản phẩm không quá 200 ký tự"],
    },
    price: {
      type: Number,
      required: [true, "Vui lòng nhập giá sản phẩm"],
      maxLength: [10, "Gía sản phẩm không quá 10 số"],
    },
    description: {
      type: String,
      required: [true, "Vui lòng nhập mô tả sản phẩm"],
    },
    status: {
      type: String,
      required: [true, "Vui lòng nhập trạng thái sản phẩm"],
      enum: {
        values: ["New 100%", "Like new 99%"],
      },
    },
    stock: {
      type: Number,
      required: [true, "Vui lòng nhập số lượng sản phẩm"],
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    ratings: {
      type: Number,
      default: 0,
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: ["Vui lòng nhập tên danh mục"],
      },
    ],
    color: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Color",
        required: [true, "Vui lòng nhập màu"],
      },
    ],
    cpu: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cpu",
        required: [true, "Vui lòng nhập Cpu"],
      },
    ],
    hardDisk: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HardDisk",
        required: [true, "Vui lòng nhập Hard Disk"],
      },
    ],
    ram: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ram",
        required: [true, "Vui lòng nhập Ram"],
      },
    ],
    graphicCard: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GraphicCard",
        required: [true, "Vui lòng nhập Graphic Card"],
      },
    ],
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    statusActive: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export default mongoose.model("Product", productSchema);
