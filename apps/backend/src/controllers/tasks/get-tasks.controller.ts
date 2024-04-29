/**
 * Get Tasks Controller
 */
 import { Admin, Task } from '../../models';
 import { Request, Response } from 'express';
 
 /**
  * Signin Admin to platform
  */
  export default async (request: Request, response: Response) => {
    try{
        const tasks = await Task.find({});
        if (!tasks)
            return response.status(400).send({ message: "No Tasks" });
        // const admins = await Admin.find({});
        return response.status(200).send({ message:"Successful", tasks });
    }
    catch(error){
        return response.status(500).send({ message:"Internal Server Error" });
    }
 }
 