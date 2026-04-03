import Joi from 'joi'
class Validations{

    registerSchema = Joi.object({
        username:Joi.string().alphanum().min(3).max(20).required(),
        email:Joi.string().email().required(),
        password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required()
    })

    loginSchema = Joi.object({
        username:Joi.string().alphanum().min(3).max(20).required(),
        password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required()
    })

    fileSchema = Joi.object({
        title: Joi.string().min(3).max(20).required(),
        userId: Joi.number().required(),
    })

    titleSchema = Joi.object({
        title: Joi.string().min(3).max(20).required(),
        fileId: Joi.number().required(),
        userId: Joi.number().required(),
    })
}

export default new Validations()