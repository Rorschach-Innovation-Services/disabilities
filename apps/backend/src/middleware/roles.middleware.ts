/**
 * Check for the role of the user currently accessing resources.
 */

import { Request, Response, NextFunction } from 'express';

export const checkRole = (request: Request, response: Response, next: NextFunction) => {
    if(!(request.user.role)){
        return response.status(401).json({ message: "Unathorized! - Limited Permission" });
    }
    next();
}