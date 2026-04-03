import { BadRequestError, InternalServerError } from "../utils/error.js";
import validations from "../validations/validations.js";
class UserMiddleware {
  register = (req, res, next) => {
    try {
      const { error } = validations.registerSchema.validate(req.body);
      if (error) {
        throw new BadRequestError(400, error.details[0].message)
      }
      next();
    } catch (error) {
      next(error)
    }
  };

  login = (req, res, next) => {
    try {
      const { error } = validations.loginSchema.validate(req.body);
      if (error) {
        throw new BadRequestError(400, error.details[0].message);
      }
      next();
    } catch (error) {
        next(error)
    }
  };

  files = (req, res, next) => {
    try {
      const { error } = validations.fileSchema.validate(req.body);
      if (error) {
        throw new BadRequestError(400, error.details[0].message);
      }
      next();
    } catch (error) {
        next(error)
    }
  };

  title = (req, res, next) => {
    try {
      const { error } = validations.titleSchema.validate(req.body);
      if (error) {
        throw new BadRequestError(400, error.details[0].message);
      }
      next();
    } catch (error) {
        next(error)
    }
  };

} 

export default new UserMiddleware();
