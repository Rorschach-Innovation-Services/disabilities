import { Request, Response } from "express";
import sendEmail from "../../utilities/sendEmail"

export default async (request: Request, response: Response) => {
    try {
        const { email, link } = request.body;
        const emailPromise = sendEmail(
            email,
            "There",
            "Sleep Science Questionnaire Link",
            `Please click on the link to access the questionnaire: ${link}`
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