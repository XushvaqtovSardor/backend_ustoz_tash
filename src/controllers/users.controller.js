import usersService from "../services/users.service.js";
class UserController {
  async register(req, res, next) {
    try {
      const data = await usersService.register(req.body, req.files, next);
      if (data) {
        return res.status(data.status).json(data);
      }
    } catch (error) {
        next(error)
    }
  }

  async login(req,res,next){
    try {
        const data = await usersService.login(req.body,next)
        if (data) {
        return res.status(data.status).json(data);
      }
    } catch (error) {
        next(error)
    }
  }

  async getAllUsers(req,res,next){
    try {
        const data = await usersService.getAllUsers()
        if(!data.length){
            return res.status(200).json({
                status:200,
                message:"Users empty"
            })
        }

        return res.status(200).json({
            status:200,
            data
        })
    } catch (error) {
        next(error)
    }
  }
}

export default new UserController();
