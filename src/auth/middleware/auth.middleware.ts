import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/login.services';
import { handleHttp } from '../utils/error.handle';

const Token = async(req: Request, res: Response, next: NextFunction)=>{
  const tokenFromClient = req.headers.authorization?.split(' ')[1];
  try {
    const decodedToken = verifyToken(tokenFromClient || '');
    req.body = decodedToken;
    next();
  } catch (error) {
    handleHttp(res, 'Token inválido', 401);
  }
}
export{Token}
