import mongoose from "mongoose";

const cpuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng nhập Cpu"],
      maxLength: [200, "Tên Cpu không quá 200 ký tự"],
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
export default mongoose.model("Cpu", cpuSchema);
