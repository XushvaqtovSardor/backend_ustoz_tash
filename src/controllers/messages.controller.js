// import messageService from "../services/messages.service.js";
// class MessageController {
//   async createMessage(req, res, next) {
//     try {
//       const data = await messageService.createMessage(req, next);
//       if (data) {
//         return res.status(data.status).json(data);
//       }
//     } catch (error) {
//       next(error);
//     }
//   }
//   async getAllMessages(req, res, next) {
//     try {
//       const data = await messageService.getAllMessages(req, next);
//       if (data) {
//         return res.status(data.status).json(data);
//       }
//     } catch (error) {
//       next(error);
//     }
//   }
// }

// export default new MessageController();
