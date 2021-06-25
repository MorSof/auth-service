import njwt from "njwt";

const usersDB = require('../db/users-db');
const bcrypt = require('bcrypt');
const {SALT_ROUNDS = 10} = process.env;
const {APP_SECRET = 'something really random'} = process.env;
const {VALID_SESSION_SECONDS = 3600} = process.env;

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

export function encodeToken(tokenData) {
    return njwt.create(tokenData, APP_SECRET).compact();
}

export function decodeToken(token) {
    return njwt.verify(token, APP_SECRET).body;
}

export async function jwtVerification(token) {

    if (!token) {
        throw Error('User not authenticated');
    }

    const decoded = decodeToken(token);
    const {email} = decoded;
    const loginDate = new Date(decoded.loginDate);

    if (!await getUserByEmail(email)) {
        throw Error('User not authenticated');
    }

    if(loginDate.setSeconds(loginDate.getSeconds() + VALID_SESSION_SECONDS) < new Date()){
        throw Error('Expired session');
    }

};
module.exports = {register, login, getUserByEmail, verifyToken}
