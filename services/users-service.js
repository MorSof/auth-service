const usersDB = require('../db/users-db');

async function login(email, password) {
    return await usersDB.login(email, password);
}

async function register(email, password, fullName) {
    return await usersDB.register(email, password, fullName);
}

async function getUserByEmail(email) {
    return await usersDB.getUserByEmail(email);
}

module.exports = {register, login, getUserByEmail}