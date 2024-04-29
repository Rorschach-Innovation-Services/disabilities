/**
 * Admin Reset Password Controller
 */
 import { Request, Response } from 'express';
 import { Admin } from '../../models';
 
export default async (request: Request, response: Response) => {
    try{
        const { id } = request.params;
        const { email, secondaryEmail } = request.body;
        const admin = await Admin.findOne({ _id: id });
        if(!admin){
            return response.status(400).json({ message: 'Admin Not Found!' });
        }
        admin.email = email;
        admin.secondaryEmail = secondaryEmail
        admin.save()
        .then(admin => {
            admin.password = "";
            return response.status(200).json({ admin });
        })
        .catch(error => {
            return response.status(500).json({ message: 'Something went bad while saving.' });
        })
    }
    catch(error){
        return response.status(500).json({ message: 'Internal Server Error' });
    }
 }
 