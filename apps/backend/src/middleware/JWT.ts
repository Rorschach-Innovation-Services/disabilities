import JWT from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secretToken = process.env.SECRET_TOKEN || 'KmLA7K3cbp';

/**
 * Generate a JWT token
 * @param identifier An object containing an identifier - email
 * @returns the token
 */
export const generateToken = (identifier: Object) => {
  return JWT.sign(identifier, secretToken as string, { expiresIn: '3hr' });
};

/**
 * Verify the token to be authorized
 * @param request
 * @param response
 * @param next
 * @returns response or goes to next function
 */
export const verifyToken = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const header = request.headers['authorization'];
  const token = header && header.split(' ')[1]; // header = "Bearer <token>"
  if (!token) throw new Error('Unauthorized! - No Token');
  JWT.verify(token, secretToken as string, (error, user) => {
    if (error) {
      return response
        .status(401)
        .send({ message: 'Unauthorized! - Wrong Token' });
    }
    request.user = user;
    next();
  });
};
