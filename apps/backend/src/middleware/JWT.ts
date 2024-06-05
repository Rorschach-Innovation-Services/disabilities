import JWT from "jsonwebtoken";

const secretToken = process.env.SECRET_TOKEN||"KmLA7K3cbp";

/**
 * Generate a JWT token
 * @param identifier An object containing an identifier - email
 * @returns the token
 */
export const generateToken = (identifier: Object) => {
  return JWT.sign(identifier, secretToken as string, { expiresIn: "3hr" });
};

/**
 * Verify the token to be authorized
 * @param request
 * @param response
 * @param next
 * @returns response or goes to next function
 */
export const verifyToken = (
  headers: Record<string, string>,
) => {
  const header = headers["authorization"];
  const token = header && header.split(" ")[1]; // header = "Bearer <token>"
  if (!token) throw new Error("Unauthorized! - No Token"); 
  JWT.verify(token, secretToken as string, (error, user) => {
    if (error) 
      throw new Error("Unauthorized! - Wrong Token")
  });
};
