import { config } from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import errorHandler from "./utils/error.handler.js";
import indexRouter from "./routers/index.js";
import cors from "cors";
config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(indexRouter.userRouter);
app.use(indexRouter.fileRouter);
// app.use(indexRouter.messageRouter);
// app.use(indexRouter.otpRouter);


app.use(errorHandler);

app.listen(process.env.PORT, () => console.log("Server is running"));
