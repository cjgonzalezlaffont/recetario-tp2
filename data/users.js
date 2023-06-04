const conn = require('./connection');
const DATABASE = 'recetario';
const USERS = 'users';


async function getUsers(){
    const connectiondb = await conn.getConnection();
    const users = await connectiondb
                        .db(DATABASE)
                        .collection(USERS)
                        .find()
                        .toArray();    
    return users;
}

module.exports = {getUsers};