import mongoose from "mongoose";

const hardDiskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng nhập Hard Disk"],
      maxLength: [200, "Tên Hard Disk không quá 200 ký tự"],
    },
    type: {
      type: String,
      required: [true, "Vui lòng nhập type"],
      maxLength: [200, "Type không quá 200 ký tự"],
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
export default mongoose.model("HardDisk", hardDiskSchema);
