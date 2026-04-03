import fs from "fs"
import {join} from "path"
export default (error,req,res,next) => {
    if(error.status && error.status < 500){
        return res.status(error.status).json({
            status:error.status,
            message:error.message,
            name:error.name
        })
    }else{
        let errorText = `\n[${new Date()}]--${req.method}--${req.url}--${error}`
        fs.appendFileSync(join(process.cwd(),'src','logs','logger.txt'),errorText)

        res.status(500).json({
            status:500,
            message:"InternalServerError"
        })
    }
}