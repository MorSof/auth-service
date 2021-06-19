const usersDB = require('../db/users-db');

async function getUser(email, password) {
    return await usersDB.getUser(email, password);
}

async function register(email, password, fullName) {
    return await usersDB.register(email, password, fullName);
}

module.exports = {register, getUser}