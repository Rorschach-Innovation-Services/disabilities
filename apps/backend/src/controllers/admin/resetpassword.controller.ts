/**
 * Admin Reset Password Controller
 */
import { Request, Response } from 'express';
import { genSaltSync, hashSync } from 'bcrypt';
import { Admin } from '../../models';

export default async (request: Request, response: Response) => {
    try{
        const { id } = request.params;
        const { password } = request.body;
        const saltRounds = 10;
        const admin = await Admin.findOne({ _id: id });
        if(!admin){
            return response.status(404).json({ message: 'Admin Not Found!' });
        }
        const salt = genSaltSync(saltRounds);
        const hash = hashSync(password, salt);
        admin.password = hash;
        admin.save()
            .then(admin => {
                return response.status(200).json({ message: 'Password Updated' });
            })
            .catch(error => {
                return response.status(500).json({ message: 'Something Went Wrong' });
            })
    }
    catch(error){
        return response.status(500).json({ message: 'Internal Server Error' });
    }
}
