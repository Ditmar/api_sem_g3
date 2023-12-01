import { Schema, model } from "mongoose";
import { LoginInterface } from "./interfaces/login.interface";

const LonginSchema = new Schema<LoginInterface>(
{
    username:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    }
})
const LoginModel = model('register',LonginSchema)
export {LoginModel}