import pool from "../database/config.js";
import { extname, join } from "path";
import fs from "fs"
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import JWT from "jsonwebtoken";
import {
  BadRequestError,
  ConflictError,
  InternalServerError,
  NotFoundError,
} from "../utils/error.js";

class UserService {
  async register(body, files, next) {

    const { username, password, email } = body || {};

    if (!username || !email || !password) {
      throw new BadRequestError(400, "username, email, password majburiy")
    }

    if (!files || !files.file) {
      throw new BadRequestError(400, "file yuborilishi shart")
    }

    const { file } = files;

    const fileName = new Date().getTime() + extname(file.name);

    const existFile = [".png", ".jpg", ".jpeg", ".svg"];

    if (!existFile.includes(extname(file.name))) {
      throw new BadRequestError(400, "file format mos emas");
    }

    const existUser = await pool.query(
      "select * from users where username=$1",
      [username]
    );
    if (existUser.rowCount) {
      throw new ConflictError(409, "User already exist");
    }

    const newUser = await pool.query(
      "insert into users(username,email,password,avatar) values($1,$2,$3,$4) RETURNING *",
      [username, email, await hashPassword(password), fileName]
    );

    file.mv(
      join(process.cwd(), "src", "uploads", "pictures", fileName),
      (err) => {
        if (err) {
          throw new InternalServerError(500, err);
        }
      }
    );

    return {
      status: 201,
      message: "User success created",
      avatar: fileName,
      accessToken: JWT.sign(
        { id: newUser.rows[0].id, username: newUser.rows[0].username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      ),
      refreshToken: JWT.sign(
        { id: newUser.rows[0].id, username: newUser.rows[0].username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      ),
    };
  }

  async login(body, next) {
    const { username, password } = body || {};

    if (!username || !password) {
      throw new BadRequestError(400, "username va password majburiy")
    }

    const existUser = await pool.query(
      "select * from users where username=$1",
      [username]
    );
    if (!existUser.rowCount) {
      throw new NotFoundError(404, "username or password wrong");
    }

    if (!(await comparePassword(password, existUser.rows[0].password))) {
      throw new NotFoundError(404, "username or password wrong");
    }

    return {
      status: 200,
      message: "User success login",
      avatar: existUser.rows[0].avatar,
      accessToken: JWT.sign(
        { id: existUser.rows[0].id, username: existUser.rows[0].username },
        process.env.JWT_SECRET,
        { expiresIn: "30m" }
      ),
      refreshToken: JWT.sign(
        { id: existUser.rows[0].id, username: existUser.rows[0].username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      ),
    };
  }

  async getAllUsers() {
    const users = await pool.query("select id,username,avatar from users");
    return users.rows;
  }
}

export default new UserService();
