import express from "express";
import notFoundHandler from "./middleware/notFound.middleware.js";
import errorHandler from "./middleware/error.middleware.js";
import logger from "./middleware/logger.middleware.js";
import cookieParser from "cookie-parser";
import path from "path";

// Routers
import userRouter from "./routes/user.router.js";
import productRouter from "./routes/product.router.js";
import orderRouter from "./routes/order.router.js";
import uploadRouter from "./routes/upload.router.js";
import promoRouter from "./routes/promo.router.js";
import chatRouter from "./routes/chat.router.js";
import demandRouter from "./routes/demand.router.js";

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger);

// Static folders
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/image", uploadRouter);
app.use("/api/v1/promo", promoRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/demands", demandRouter);

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export { app };
