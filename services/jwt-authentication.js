import njwt from 'njwt';
const usersService = require('./users-service');

const {APP_SECRET = 'something really random'} = process.env;
const {VALID_SESSION_SECONDS = 3600} = process.env;

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

    if (!await usersService.getUserByEmail(email)) {
        throw Error('User not authenticated');
    }

    if(loginDate.setSeconds(loginDate.getSeconds() + VALID_SESSION_SECONDS) < new Date()){
        throw Error('Expired session');
    }

};
