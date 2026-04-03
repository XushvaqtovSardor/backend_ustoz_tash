import { Router } from 'express'
import fileController from '../controllers/files.controller.js'
import validation from '../middleware/validation.js'
// import checkToken from '../middleware/checkToken.js'
const router = Router()

router
    .post("/api/files",validation.files,fileController.createFile)

    .get("/api/files/oneUser/:userId",fileController.getUserFiles)

    .get("/api/files/all",fileController.getAllFiles)

    .get('/file/:file_name', fileController.getFile)

    .get("/api/file/download/:file_name",fileController.download)

    .put("/api/files",validation.title,fileController.fileUpdate)

    .delete("/api/files",fileController.deleteFile)

export default router
