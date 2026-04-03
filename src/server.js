import { config } from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import errorHandler from "./utils/error.handler.js";
import indexRouter from "./routers/index.js";
import cors from "cors";
import { randomUUID } from "crypto";
import swaggerUi from "swagger-ui-express";
import { openApiDocument } from "./common/config/openapi.js";
import { initDatabase } from "./database/config.js";
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

app.get("/", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Service is running",
        docs: "/api/docs",
    });
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
    });
});

app.use(indexRouter.userRouter);
app.use(indexRouter.fileRouter);
// app.use(indexRouter.messageRouter);
// app.use(indexRouter.otpRouter);

app.get("/api", (req, res) => {
    res.redirect("/api/docs");
});

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument, {
    explorer: true,
}));

app.use((req, res, next) => {
    const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
    error.status = 404;
    next(error);
});

app.use(errorHandler);

const port = Number(process.env.PORT) || 3000;

async function startServer() {
    await initDatabase();
    app.listen(port, () => console.log(`Server is running on port ${port}`));
}

startServer().catch(() => process.exit(1));
