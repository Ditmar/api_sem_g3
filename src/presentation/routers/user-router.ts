import express from 'express';
import HttpStateCodes from '../../utils/http-state-codes';
import NoSQLWrapper from '../../data/interfaces/data-sources/no-sql-wrapper';
import { AUTH, USER, authMessages, userMessage } from '../../utils/message';
const UserRouter = (db: NoSQLWrapper) => {
    // routing
    const router = express.Router();
    router.get('/user', async(request, response) => {
        const resultDbList = await db.FindAllUsers();
        response.status(HttpStateCodes.OK).json({response: resultDbList});
    });
    router.post('/user', async(request, response) => {
        const user = request.body;
        const resultDb = await db.CreateUser(user);
        if(resultDb === USER.EXISTS) response.status(HttpStateCodes.FORBIDDEN).json({response:userMessage.userExists})
        else response.status(HttpStateCodes.CREATED).json({response: resultDb});
    });
    router.post('/login', async(request, response)=>{
        const user = request.body;
        const resultDb = await db.Login(user);
        if(resultDb === USER.NOT_FOUND)
        {
            response.status(HttpStateCodes.NOT_FOUND).json({response:userMessage.userNotFound});
            return;
        }
        if(resultDb === AUTH.PASSWORD_INCORRECT){
            response.status(HttpStateCodes.UNAUTHORIZED).json({response:authMessages.passwordIncorrect})
            return;
        }
        response.status(HttpStateCodes.OK).json({response:resultDb})
    });
    return router;
}
export default UserRouter;