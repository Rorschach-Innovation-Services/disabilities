/**
 * Admin Reset Password Controller
 */
import { Request, Response } from 'express';
import { genSaltSync, hashSync } from 'bcrypt';
import { Admin } from '../../models';

export default async (request: Request, response: Response) => {
    try{
        const { id } = request.params;
        const admin = await Admin.findOne({ _id: id });
        if(!admin){
            return response.status(400).json({ message: 'Admin Not Found!' });
        }
        admin.deleted = true;
        admin.save()
            .then(admin => {
                return response.status(200).json({ message: 'Admin Deleted' });
            })
            .catch(error => {
                return response.status(500).json({ message: 'Something Went Wrong' });
            })
    }
    catch(error){
        return response.status(500).json({ message: 'Internal Server Error' });
    }
}
 