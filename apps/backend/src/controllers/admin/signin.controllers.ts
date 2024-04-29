/**
 * Admin Signin Controller
 */
import { Admin } from "../../models";
import bcrypt from "bcrypt";
import { generateToken } from "../../middleware/JWT.middleware";
import { Request, Response } from "express";

/**
 * Signin Admin to platform
 */
export default async (request: Request, response: Response) => {
    try {
        const { email, password } = request.body;

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return response.status(400).send({ message: "User does not exist. Please Request Registration" });
        }else{
            if(admin.deleted)
                return response.status(400).send({ message: "User does no longer exist. Please Request Registration"});
            const verified = await bcrypt.compare(password, admin.password);
            if(!verified){
                return response.status(400).send({ message: "Incorrect Email/Password"});
            }
            const token = generateToken({ email, role: 'admin' });
            admin.password = '';
            return response.status(200).send({ message:"Successful login", token, admin });
        }
    } catch (error) {
        return response.status(500).send({ message: "Internal Server Error" });
    }
};
