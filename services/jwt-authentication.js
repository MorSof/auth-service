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

export const jwtAuthenticationMiddleware = async (req, res, next) => {
    const token = req.header('Access-Token');
    if (!token) {
        return next();
    }

    try {
        const decoded = decodeToken(token);
        const {email} = decoded;
        const loginDate = new Date(decoded.loginDate);

        if (await usersService.getUserByEmail(email)) {
            req.email = email;
        }

        if(loginDate.setSeconds(loginDate.getSeconds() + VALID_SESSION_SECONDS) > new Date()){
            req.loginDate = loginDate;
        }

    } catch (e) {
        return next();
    }

    next();
};

// This middleware stops the request if a user is not authenticated.
export async function isAuthenticatedMiddleware(req, res, next) {
    if (!req.email) {
        res.status(401).json({ error: 'User not authenticated' });
    }
    if (!req.loginDate) {
        res.status(401).json({ error: 'Expired session' });
    }
    return next();
}

// This service generates and returns a JWT access token given authentication data.
export async function jwtLogin(req, res) {
    const { email, password } = req.body;
    const user = await usersService.login(email, password);

    if (!user) {
        res.status(401);
        return res.json({ error: 'Invalid email or password' });
    }

    const accessToken = encodeToken({ email: email, loginDate: new Date()});
    return res.json({ accessToken });
}
