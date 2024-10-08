import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

export const app = express();

app.use(
  cors({
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import

import userRouter from "./routes/authRoutes.js";
import eventRouter from "./routes/eventRoutes.js";

//routes declaration
app.use("/api/auth", userRouter);
app.use("/api/events", eventRouter);
