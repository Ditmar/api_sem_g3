import server from './server'
import UserRouter from './presentation/routers/user-router';
import { MongoClient } from 'mongodb';
import NoSQLWrapper from './data/interfaces/data-sources/no-sql-wrapper';
import { Response } from 'express';
import 'dotenv/config'
import jwt from 'jsonwebtoken';
import { compare, hash } from 'bcryptjs';
import User from './domain/models/User';
import { AUTH, USER } from './utils/message';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
//mongo
const getMongoDBClient = async (): Promise<NoSQLWrapper> => {
    //mongodb://admin:password@localhost:27017/db
    const stringConnection = `mongodb://${process.env.API_MONGO_USERNAME}:${process.env.API_MONGO_PASSWORD}@localhost:27017`
    const uri = stringConnection;
    const client = new MongoClient(uri);

    client.connect();
    const database = process.env.API_MONGO_DBNAME;
    
    const db = client.db(database);
    const SECRET = process.env.SECRET_TOKEN || 'seminario'
    const CreateUser = async (user: User): Promise<any> => {
        const {id,name,email,password}=user;
        const findUser = await FindOneUser(id)
        if(findUser)return USER.EXISTS;
        const criptoPassword=await hash(password,8)
        const result = await db.collection('users').insertOne({id,name,email,criptoPassword});
        const findUser = await FindOneUser(id);
    // No console.log statement here
    // Handle success message or further logic if needed
}

        const userToken = {
            data:result.insertedId,
            token:generateToken(user)
        }
        return {
            acknowledged: result.acknowledged,
            insertedId: userToken,
        };
    }
    const FindAllUsers = async (): Promise<any[]> => {
        const result = await db.collection('users').find({}).toArray();
        return result;
    }
    const FindOneUser = async (id?:string, email?:string): Promise<any> =>{
        const result = await db.collection('users').findOne({id}||{email});
        return result;
    }
    const Login =async ({email,password}:User) => {
        const user = await FindOneUser(email)
        if(!user)return USER.NOT_FOUND
        const checkPassword = await compare(password,user.password)
        if(!checkPassword)return AUTH.PASSWORD_INCORRECT
        return {
            user:user,
            token: generateToken(user)
        }
    }
    const generateToken =async (user:User) => {
        return jwt.sign(user,SECRET,{expiresIn:'1h'})
    }
    return {
        CreateUser,
        FindAllUsers,
        Login,
    }
}

// const getPgDBClient = () => {

// }
// //todo homework
// const getSqlServerClient = () => {

// }

(async() => {
    const db = await getMongoDBClient();
    server.use('/api', UserRouter(db));
    const port = process.env.API_PORT || 3000;
    server.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
})();