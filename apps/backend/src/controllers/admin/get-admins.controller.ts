/**
 * Admin Reset Password Controller
 */
 import { Request, Response } from 'express';
 import { Admin } from '../../models';
 
 export default async (request: Request, response: Response) => {
    try{
        const admins = await Admin.find();
        if(!admins){
            return response.status(400).json({ message: 'Admins Not Found!' });
        }
        const adminsRes = admins.filter(admin => !admin.deleted)
        return response.status(200).json({ admins: adminsRes });
    }
    catch(error){
        return response.status(500).json({ message: 'Internal Server Error' });
    }
 }
 