import filesService from "../services/files.service.js";

class FileController {
  async createFile(req, res, next) {
    try {
      const data = await filesService.createFile(req, next);
      if (data) {
        return res.status(data.status).json(data);
      }
    } catch (error) {
      next(error);
    }
  }
  async getUserFiles(req, res, next) {
    try {
      const data = await filesService.getUserFiles(req.params.userId, next);

      return res.status(data.status).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getAllFiles(req, res, next) {
    try {
      const data = await filesService.getAllFiles(req, next);
      if (data) {
        return res.status(data.status).json(data);
      }
    } catch (error) {
      next(error);
    }
  }

  async getFile(req, res, next) {
    try {
      const data = await filesService.getFile(req, next);
      
      if (data) {
        return res.status(data.status).sendFile(data.filePath);
      }
    } catch (error) {
      next(error);
    }
  }

  async fileUpdate(req, res, next) {
    try {
      const data = await filesService.fileUpdate(req, next);
      if (data) {
        return res.status(data.status).json(data);
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteFile(req, res, next) {
    try {
      const data = await filesService.deleteFile(req, next);
      if (data) {
        return res.status(data.status).json(data);
      }
    } catch (error) {
      next(error);
    }
  }

  async download(req,res,next){
    try {
      const data = await filesService.download(req)

      if(data){
        return res.status(data.status).download(data.filePath)
      }
    } catch (error) {
      next(error)
    }
  }
}



export default new FileController();
