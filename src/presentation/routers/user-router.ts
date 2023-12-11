import express from 'express';
import HttpStateCodes from '../../utils/http-state-codes';
import NoSQLWrapper from '../../data/interfaces/data-sources/no-sql-wrapper';
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
        if(resultDb == 'USER_EXISTS') response.status(HttpStateCodes.FORBIDDEN).json({response:'USER EXISTS'})
        else response.status(HttpStateCodes.CREATED).json({response: resultDb});
    });
    router.post('/login', async(request, response)=>{
        const user = request.body;
        const resultDb = await db.Login(user);
        if(resultDb == 'NOT_FOUND')
        {
            response.status(HttpStateCodes.NOT_FOUND).json({response:'USER NOT FOUND'});
            return;
        }
        if(resultDb == 'PASSWORD_ICORRECT'){
            response.status(HttpStateCodes.UNAUTHORIZED).json({response:'PASSWORD ICORRECT'})
            return;
        }
        response.status(HttpStateCodes.OK).json({response:resultDb})
    });
    return router;
}
export default UserRouter;