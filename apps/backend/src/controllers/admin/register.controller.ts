/**
 * Admin Register Controller
 */
import { Admin } from "../../models";
import { Request, Response } from "express";
import sendEmail from "../../utilities/sendEmail";

/**
 * Register Admin to platform
 */
export default async (request: Request, response: Response) => {
  try {
    const { name, email } = request.body;
    const admin = new Admin({ name, email });
    admin
      .save()
      .then((admin) => {
        const subject = "Welcome To Sleep Science Platform";
        const message = `Thank you for registering to the platform. Please create your password by following the link:\nhttp://ec2-13-246-63-101.af-south-1.compute.amazonaws.com:9000/create-password/${admin._id}`;
        const emailPromise = sendEmail(
          admin.email,
          admin.name,
          subject,
          message
        );
        emailPromise
          .then((data: any) => {
            return response
              .status(200)
              .json({ message: "Registration Successful", data });
          })
          .catch((error: any) => {
            return response.json({ error: error });
          });
      })
      .catch((error: any) => {
        if (error.code === 11000) {
          return response
            .status(409)
            .send({ message: "Account Exists. Sign In Instead." });
        }
        return response.status(400).send({ message: "Validation Failed" });
      });
  } catch (error) {
    return response.status(500).send({ message: "Internal Server Error" });
  }
};

