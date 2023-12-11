import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import HttpStateCodes from './http-state-codes';

const SECRET = process.env.SECRET_TOKEN || 'seminario'
const Token = async(req: Request, res: Response, next: NextFunction)=>{
  const tokenFromClient = req.headers.authorization?.split(' ')[1];
  try {
    const decodedToken = verifyToken(tokenFromClient || '');
    req.body = decodedToken;
    next();
  } catch (error) {
    res.status(HttpStateCodes.UNAUTHORIZED).json('Token inválido');
  }
}
const verifyToken = async(token: string) =>{
    try {
      return jwt.verify(token, SECRET);
    } catch (error) {
      throw new Error('Token inválido');
    }
}

export{Token}