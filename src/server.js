import { config } from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import errorHandler from "./utils/error.handler.js";
import indexRouter from "./routers/index.js";
import cors from "cors";
import { randomUUID } from "crypto";
config();

const app = express();

app.use((req, res, next) => {
    const requestId = randomUUID();
    req.requestId = requestId;
    res.setHeader("x-request-id", requestId);
    next();
});

app.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const ms = Date.now() - start;
        console.log(
            `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} ${ms}ms reqId=${req.requestId}`,
        );
    });
    next();
});

app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(indexRouter.userRouter);
app.use(indexRouter.fileRouter);
// app.use(indexRouter.messageRouter);
// app.use(indexRouter.otpRouter);

app.use((req, res, next) => {
    const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
    error.status = 404;
    next(error);
});

app.use(errorHandler);

app.listen(process.env.PORT, () => console.log("Server is running"));
