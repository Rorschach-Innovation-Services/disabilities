import { Request, Response } from "express";
import { Admin } from "../../models";
import sendEmail from "../../utilities/sendEmail"

export default async (request: Request, response: Response) => {
    try {
        const { email } = request.body;
        const admin = await Admin.findOne({ email: email });
        if(!admin){
            return response.status(400).json({ message: 'Admin Not Found!' });
        }
        const emailPromise = sendEmail(
            email,
            admin.name,
            "Reset Password",
            `Please click on the link to reset your password: https://sleepscience.co.za/create-password/${admin._id}`
        );
        emailPromise
            .then((data: any) => {
                return response
                    .status(200)
                    .json({ message: "Link Sent", data });
            })
            .catch((error: any) => {
                return response.json({ error: error });
            });
    }
    catch(error: unknown){
        return response.status(500).send({ message: "Internal Server Error" });
    }
}