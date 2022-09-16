import UserContainer from '../daos/userDao.js'

const User = new UserContainer("usuarios",
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true }
    });

export default User;
