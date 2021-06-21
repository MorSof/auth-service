import {encodeToken, jwtVerification} from "./jwt-authentication";

const usersDB = require('../db/users-db');
const bcrypt = require('bcrypt');
const {SALT_ROUNDS = 10} = process.env;

async function login(email, password) {
    let user = await getUserByEmail(email);
    if(user == null || !bcrypt.compareSync(password, user.password)) {
        throw new Error('Invalid email or password');
    }
    return encodeToken({ email: email, loginDate: new Date()});
}

async function register(email, password, fullName) {
    if (await usersDB.getUserByEmail(email)){
        throw new Error("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return await usersDB.register(email, hashedPassword, fullName);
}

async function verifyToken(accessToken) {
    await jwtVerification(accessToken);
    return true;
}

async function getUserByEmail(email) {
    return await usersDB.getUserByEmail(email);
}

module.exports = {register, login, getUserByEmail, verifyToken}
