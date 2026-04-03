import fs from "fs";
import { join } from "path";

export default (error, req, res, next) => {
    const status = error?.status && Number.isInteger(error.status) ? error.status : 500;
    const level = status >= 500 ? "ERROR" : "WARN";
    const showInternalError = process.env.SHOW_INTERNAL_ERROR === "true";

    const logPayload = {
        at: new Date().toISOString(),
        level,
        requestId: req.requestId,
        method: req.method,
        url: req.originalUrl || req.url,
        status,
        name: error?.name || "Error",
        message: error?.message || "Unknown error",
        stack: error?.stack || null,
        params: req.params,
        query: req.query,
    };

    const logLine = `${JSON.stringify(logPayload)}\n`;
    const logPath = join(process.cwd(), "src", "logs", "logger.txt");

    try {
        fs.mkdirSync(join(process.cwd(), "src", "logs"), { recursive: true });
        fs.appendFileSync(logPath, logLine);
    } catch (writeError) {
        console.error("Failed to write error log file", writeError);
    }

    console.error(logPayload);

    return res.status(status).json({
        status,
        message: status >= 500 && !showInternalError ? "InternalServerError" : logPayload.message,
        name: logPayload.name,
        requestId: req.requestId,
    });
};