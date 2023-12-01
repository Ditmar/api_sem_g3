import { hash } from "bcryptjs";
import { RegisterInterface } from "../schema/interfaces/register.interface";
import { RegisterModel } from "../schema/register.schema";

const registerPost =async ({username,password}:RegisterInterface) => {
    const check = await RegisterModel.findOne({username})
    if(check)return 'OK'

    const passwordHash = await hash(password,8)
    const response = await RegisterModel.create({
        username,
        password:passwordHash
    })
    return response
}
export{registerPost}