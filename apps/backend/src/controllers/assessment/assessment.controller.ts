/**
 * Assessment Handlers
 */
import { Assessment } from '../../models/';
import { Request, Response } from 'express';
import { ObjectId } from 'mongoose';

/**
 * Retrieve all assessments
 * @param request object
 * @param response object
 * @returns response
 */
export const getAssessments = async (request: Request, response: Response) => {
    try{
        const assessments = await Assessment.find({deleted:false}).where("deleted").equals(false);
        if(!assessments){
            return response.status(404).json({ message: 'Assessments Not Found' });
        }
        return response.status(200).json(assessments);
    }
    catch(error){
        return response.status(500).json({message: 'Internal Server Error' })
    }
}

export const getAssessment = async (request: Request, response: Response) => {
    try{
        const { employee } = request.body;
        const assessment = await Assessment.findOne({ employee }).where("deleted").equals(false);
        if(!assessment){
            return response.status(400).json({ message: 'Assessment Not Found' });
        }
        return response.status(200).json({assessment});
    }
    catch(error){
        return response.status(500).json({message: 'Internal Server Error' })
    }
}
