/**
 * Admin Reset Password Controller
 */
 import { Request, Response } from 'express';
 import { Admin, Company } from '../../models';
 import { Types, ObjectId } from "mongoose"
 
 export default async (request: Request, response: Response) => {
    try{
        const { id } = request.params;
        const admin = await Admin.findOne({ _id: id });
        if(!admin){
            return response.status(400).json({ message: 'Admin Not Found!' });
        }
        const clients = await Company.find({});
        // console.log(clients)
        const adminClients = clients.filter(client => {
            return client.admin && !client.deleted ? client.admin.equals(id) : false
        });
        // console.log("Admin Cl ", adminClients)
        return response.status(200).json({ clients: adminClients });
    }
    catch(error){
        console.log(error)
        return response.status(500).json({ message: 'Internal Server Error' });
    }
}
 