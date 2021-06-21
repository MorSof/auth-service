import njwt from 'njwt';
const usersService = require('./users-service');

const {APP_SECRET = 'something really random'} = process.env;

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

        if (await usersService.getUserByEmail(email)) {
            console.log('found user!');
            req.email = email;
        }
    } catch (e) {
        return next();
    }

    next();
};

// This middleware stops the request if a user is not authenticated.
export async function isAuthenticatedMiddleware(req, res, next) {
    if (req.email) {
        return next();
    }
    res.status(401).json({ error: 'User not authenticated' });
}

// This endpoints generates and returns a JWT access token given authentication data.
export async function jwtLogin(req, res) {
    const { email, password } = req.body;
    const user = await usersService.login(email, password);

    if (!user) {
        res.status(401);
        return res.json({ error: 'Invalid email or password' });
    }

    const accessToken = encodeToken({ email: email });
    return res.json({ accessToken });
}
