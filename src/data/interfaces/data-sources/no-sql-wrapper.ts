import User from '../../../domain/models/User';

interface NoSQLWrapper {
    CreateUser: (user: User) => Promise<any>;
    FindAllUsers: () => Promise<any[]>;
    Login: (user:User) => Promise<any>;
    
}
export default NoSQLWrapper;