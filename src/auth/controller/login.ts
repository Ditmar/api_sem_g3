import { generateToken, loginService} from "../services/login.services"
import { handleHttp } from "../utils/error.handle"

const loginController = async({body}:Request | any,res:Response|any)=>{
    try{
        const {username, password} = body
        const response = await loginService(body)
        if(response=='NOT_FOUND')handleHttp(res,'usuario no registrado',404)
        if(response=='PASSWORD_INCORRECT')handleHttp(res,'Contraseña es incorrecta',403)
        const token = await generateToken({username,password});
        handleHttp(res, { token, response }, 200);
    }catch (e){
        handleHttp(res,'ERROR_POST_ITEM',500,e)
    }
}
export{loginController}