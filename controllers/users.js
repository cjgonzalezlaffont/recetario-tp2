const users = require('../data/users');

async function getUsers(){    
    return users.getUsers();
}

module.exports = {getUsers};