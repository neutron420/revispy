import { verifyToken } from '../utils/auth';
export const verifyTokenMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided' });
        }
        const token = authHeader.substring(7);
        const decoded = verifyToken(token);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};
export const createAuthContext = (req) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return { userId: undefined, isAuthenticated: false };
        }
        const token = authHeader.substring(7);
        const decoded = verifyToken(token);
        return { userId: decoded.userId, isAuthenticated: true };
    }
    catch (error) {
        return { userId: undefined, isAuthenticated: false };
    }
};
