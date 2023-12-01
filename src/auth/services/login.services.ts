import jwt from 'jsonwebtoken';
import 'dotenv/config'
import { compare } from "bcryptjs";
import { LoginInterface } from "../schema/interfaces/login.interface";
import { LoginModel } from "../schema/login.schema";

const SECRET = process.env.SECRET_TOKEN || 'DEFAULT'
const loginService =async ({username,password}:LoginInterface) => {
    const user = await LoginModel.findOne({username})
    if(!user)return 'NOT_FOUND'
    const checkPassword = await compare(user.password,password)
    if(!checkPassword)return 'PASSWORD_INCORRECT'
    return user
}
const generateToken =async (user:LoginInterface) => {
    return jwt.sign(user,SECRET,{expiresIn:'1h'})
}
const verifyToken = async(token: string) =>{
    try {
      return jwt.verify(token, SECRET);
    } catch (error) {
      throw new Error('Token inválido');
    }
}
export{loginService,generateToken,verifyToken}