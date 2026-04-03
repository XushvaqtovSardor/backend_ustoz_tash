import pool from "../database/config.js";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../utils/error.js";
import { extname, join } from "path";
import fs from "fs";

class FileService {
  async getUserFiles(userId, next) {
    let files = await pool.query("select * from files where user_id=$1", [
      userId,
    ]);

    if (!files.rowCount) {
      return {
        status: 200,
        message: "User has no videos",
        files: [],
      };
    }
    return {
      status: 200,
      files: files.rows,
    };
  }

  async getAllFiles(req, next) {
    const { title } = req.query;
    let files


    if (!title) {
      files =
        await pool.query(`select files.id, files.title, files.size, files.created_at, files.file_name, 
      json_build_object(
      'id', users.id,
      'name', users.username, 
      'avatar', users.avatar
      ) AS user from files
      inner join users on users.id = files.user_id
     `);
    } else {
      files =
        await pool.query(`select files.id, files.title, files.size, files.created_at, files.file_name, 
      json_build_object(
      'id', users.id,
      'name', users.username, 
      'avatar', users.avatar
      ) AS user from files
      inner join users on users.id = files.user_id
      where files.title ilike $1
     `, [`%${title}%`]);
    }

    return {
      status: 200,
      files: files.rows,
    };
  }

  async getFile(req, next) {
    const { file_name } = req.params
    const { media } = req.query

    const existFile = [
      ".mp4",
      ".webm",
      ".mpeg",
      ".avi",
      ".mkv",
      ".m4v",
      ".ogm",
      ".mov",
      ".mpg",
    ];

    const existFileAvatar = [".png", ".jpg", ".jpeg", '.svg']

    let filePath

    if (media) {
      filePath = join(process.cwd(), 'src', 'uploads', 'media', file_name)
    } else if (existFile.includes(extname(file_name))) {
      filePath = join(process.cwd(), 'src', 'uploads', 'videos', file_name)
    } else if (existFileAvatar.includes(extname(file_name))) {
      filePath = join(process.cwd(), 'src', 'uploads', 'pictures', file_name)
    } else {
      throw new NotFoundError(404, "File name not found")
    }

    return {
      status: 200,
      filePath
    }
  }

  async createFile(req, next) {
    const { title, userId } = req.body || {};

    if (!title || !userId) {
      throw new BadRequestError(400, "title va userId majburiy")
    }

    if (!req.files || !req.files.file) {
      throw new BadRequestError(400, "file yuborilishi shart")
    }

    const { file } = req.files;

    const existFile = [
      ".mp4",
      ".webm",
      ".mpeg",
      ".avi",
      ".mkv",
      ".m4v",
      ".ogm",
      ".mov",
      ".mpg",
    ];

    if (!existFile.includes(extname(file.name))) {
      throw new BadRequestError(400, "Not supported file");
    }

    const fileName = new Date().getTime() + extname(file.name);
    if (file.size / 1024 / 1024 < 1) {
      file.size = Math.ceil(file.size / 1024 / 1024);
    } else {
      file.size = Math.floor(file.size / 1024 / 1024);
    }

    const existUser = await pool.query("select * from users where id=$1", [
      userId,
    ]);
    if (!existUser.rowCount) {
      throw new NotFoundError(404, "User not found");
    }

    file.mv(
      join(process.cwd(), "src", "uploads", "videos", fileName),
      (error) => {
        if (error) {
          throw new InternalServerError(500, error);
        }
      }
    );

    await pool.query(
      "insert into files(title,file_name,size,user_id) values($1,$2,$3,$4)",
      [title, fileName, file.size, userId]
    );

    return {
      status: 201,
      message: "File success created",
    };
  }

  async fileUpdate(req, next) {
    const { fileId, userId, title } = req.body || {};

    if (!fileId || !userId || !title) {
      throw new BadRequestError(400, "title, fileId, userId majburiy")
    }

    const existFile = await pool.query(
      "select * from files where id=$1 and user_id=$2",
      [fileId, userId]
    );
    if (!existFile.rowCount) {
      throw new NotFoundError(400, "Not found file of this user");
    }

    await pool.query("update files set title=$1 where id=$2", [title, fileId]);

    return {
      status: 201,
      message: "File successfully update",
    };
  }

  async deleteFile(req, next) {
    const { fileId, userId } = req.body || {};

    if (!fileId || !userId) {
      throw new BadRequestError(400, "fileId va userId majburiy")
    }

    const existFile = await pool.query(
      "select * from files where id=$1 and user_id=$2",
      [fileId, userId]
    );
    if (!existFile.rowCount) {
      throw new NotFoundError(400, "Not found file of this user");
    }

    await pool.query("delete from files where id=$1", [fileId]);

    fs.unlinkSync(
      join(
        process.cwd(),
        "src",
        "uploads",
        "videos",
        existFile.rows[0].file_name
      )
    );

    return {
      status: 200,
      message: "File successfully deleted",
    };
  }

  async download(req) {
    const { file_name } = req.params

    const existFile = [
      ".mp4",
      ".webm",
      ".mpeg",
      ".avi",
      ".mkv",
      ".m4v",
      ".ogm",
      ".mov",
      ".mpg",
    ];

    let filePath

    if (existFile.includes(extname(file_name))) {
      filePath = join(process.cwd(), 'src', 'uploads', 'videos', file_name)
    } else {
      throw new NotFoundError(404, "File name not found")
    }

    return {
      status: 200,
      filePath
    }

  }
}

export default new FileService();
