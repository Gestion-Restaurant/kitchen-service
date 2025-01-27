import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

declare global {
    namespace Express {
        interface Request {
            token?: string;
        }
    }
}

// verify cookies and jwt token
export const jwtMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        jwt.verify(token, process.env.JWT_SECRET ?? '', (err: any, decoded: any) => {
            if (err || !decoded) {
                res.status(401).json({ error: 'Invalid token' });
                return;
            }

            req.token = decoded;
            req.body.restaurantId = decoded.id;
            next();
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const jwtMiddlewareOwner = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        jwt.verify(token, process.env.JWT_SECRET ?? '', (err: any, decoded: any) => {
            if (err || !decoded) {
                res.status(401).json({ error: 'Invalid token' });
                return;
            }

            if (req.body.restaurantId !== decoded.id) {
                res.status(403).json({ error: 'Not authorized' });
                return;
            }

            req.token = decoded;
            req.body.restaurantId = decoded.id;
            next();
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};