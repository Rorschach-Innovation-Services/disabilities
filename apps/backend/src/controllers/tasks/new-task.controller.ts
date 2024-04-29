/**
 * New Task Controller
 */
 import { Admin, Task } from '../../models';
 import { Request, Response } from 'express';
 
 /**
  * Signin Admin to platform
  */
  export default async (request: Request, response: Response) => {
    try{
        const { admin, content, title } = request.body;
        const task = new Task({
            content,
            title,
            adminId: admin
        });
        const adminDoc = await Admin.findOne({ _id: admin });
        if(!adminDoc) return response.status(400).send({ message:"Admin not found" });
        task.admin = adminDoc.name;
        task.photo = adminDoc.photo;
        task.adminId = adminDoc._id;
        task.save()
            .then(task => {
                return response.status(200).send({ message: "Created Task", task });
            })
            .catch(error => {
                return response.status(400).send({ message:"Error Occured", error });
            });
    }
    catch(error){
        return response.status(500).send({ message:"Internal Server Error" });
    }
 }
 