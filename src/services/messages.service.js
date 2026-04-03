// import pool from "../database/config.js";
// import { extname, join } from "path";
// import { InternalServerError } from "../utils/error.js";

// class MessageService {
//   async createMessage(req, next) {
//     const { user_id_to } = req.params;
//     const { id } = req.user;


//     const user = await pool.query("select * from users where id=$1",[user_id_to])
//     let file;
//     if (req.files) {
//       file = req.files.file;
//     }



//     const fileName = file && new Date().getTime() + extname(file.name);
//     const newMessage = await pool.query(
//       "insert into messages(message_type,message,user_id_to,user_id_from) values($1,$2,$3,$4) RETURNING *",
//       [
//         file ? file.mimetype : "plan/text",
//         file ? fileName : req.body.message,
//         user_id_to,
//         id,
//       ],
//     );

//     process.io.to(user.rows[0].socket_id).emit("send_message",newMessage.rows[0].message,file ? file.mimetype : "plan/text")

//     file &&
//       file.mv(
//         join(process.cwd(), "src", "uploads", "media", fileName),
//         (err) => {
//           if (err) {
//             throw new InternalServerError(500, err);
//           }
//         },
//       );

//     return {
//       status: 201,
//       message: "message send",
//     };
//   }

//   async getAllMessages(req, next) {
//     const { user_id_to } = req.params;
//     const { id } = req.user;

//     const messages = await pool.query(
//       `select * from messages where 
//       ( user_id_from = $1 and user_id_to=$2) 
//       or
//       ( user_id_to = $1 and user_id_from=$2)
//       `,
//       [id, user_id_to],
//     );

//     return {
//       status:200,
//       messages:messages.rows
//     }
//   }
// }

// export default new MessageService();
