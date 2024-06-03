import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";

import errorMiddlewares from "./middlewares/errors.js";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

import dotenv from "dotenv";
dotenv.config();
const { PORT, mongoDB } = process.env;

app.use(express.json());

//Routesr
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/order.js";
import authRoutes from "./routes/auth.js";
import paymentRoutes from "./routes/payment.js";
app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", paymentRoutes);

import categoryRoutes from "./routes/categories.js";
import colorRoutes from "./routes/colors.js";
import cpuRoutes from "./routes/cpus.js";
import ramRoutes from "./routes/ram.js";
import hardDiskRoutes from "./routes/hardDisk.js";
import graphicCardRoutes from "./routes/graphicCard.js";
app.use("/api/v1", productRoutes);
app.use("/api/v1", categoryRoutes);
app.use("/api/v1", colorRoutes);
app.use("/api/v1", cpuRoutes);
app.use("/api/v1", ramRoutes);
app.use("/api/v1", hardDiskRoutes);
app.use("/api/v1", graphicCardRoutes);

app.use(errorMiddlewares);

// Kết nối Db
const connectDB = async () => {
  try {
    await mongoose.connect(`${mongoDB}`);
    console.log("Mongodb connencted ");
    app.listen(PORT, () => {
      console.log(`Back-end is running ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
connectDB();
