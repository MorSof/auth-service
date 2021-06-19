const usersDB = require('../db/users-db');

async function getBlockById(email, password, fullName) {
    return await usersDB.register(email, password, fullName);
}

module.exports = {getBlockById}