import { registerPost } from "../services/register.services"
import { handleHttp } from "../utils/error.handle"

const registerController = async({body}:Request | any,res:Response|any)=>{
    try{
        const response = await registerPost(body)
        if(response=='OK')
        {
            handleHttp(res,'user exists to data base',409)
        }
    }catch (e){
        handleHttp(res,'ERROR_POST',500,e)
    }
}
export{registerController}