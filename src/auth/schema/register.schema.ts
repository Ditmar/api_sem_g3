import { Schema, model } from "mongoose";
import { RegisterInterface } from "./interfaces/register.interface";

const LonginSchema = new Schema<RegisterInterface>(
    {
        username:{
            type: String,
            required:true,
            unique:true
        },
        password:{
            type: String,
            required:true
        }
})

const RegisterModel = model('register',LonginSchema)
export{RegisterModel}