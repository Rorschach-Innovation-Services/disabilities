/**
 * Admin Reset Password Controller
 */
import { Request, Response } from 'express';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { Admin } from '../../models';
 
export default async (request: Request, response: Response) => {
    try{
        const { id } = request.params;
        const { password, newPassword } = request.body;
        const saltRounds = 10;
        const admin = await Admin.findOne({ _id: id });
        if(!admin){
            return response.status(400).json({ message: 'Admin Not Found!' });
        }
        const verified = compareSync(password, admin.password);
        if(!verified){
            return response.status(400).send({ message: "Incorrect Password"});
        }
        const salt = genSaltSync(saltRounds);
        const hash = hashSync(newPassword, salt);
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
 