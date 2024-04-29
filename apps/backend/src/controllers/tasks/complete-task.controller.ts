/**
 * Complete Task Controller
 */
 import { Admin, Task } from '../../models';
 import { Request, Response } from 'express';
 
 /**
  * Signin Admin to platform
  */
  export default async (request: Request, response: Response) => {
    try{
        const { complete } = request.body;
        const { id } = request.params;
        const task = await Task.findOneAndUpdate({ _id: id }, { complete });
        if(!task) return response.status(400).send({ message:"Task not found" });
        return response.status(200).send({ message: "Task Complete", task });
    }
    catch(error){
        return response.status(500).send({ message:"Internal Server Error" });
    }
 }
 