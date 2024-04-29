/**
 * Get average data from assessments
 */
import { Assessment, Employee } from "../../models";
import { Request, Response } from 'express';
import { Score } from '../../models/assessment.model'

export default async (request: Request, response: Response) => {
    try{
        const employees = await Employee.find().where("deleted").equals(false);
        const assessments = await Assessment.find({deleted:false});
        if(!assessments){
            return response.status(404).json({ message: 'Assessments Not Found!' });
        }
        /**Number of Assessments */
        const completedAssessments = assessments.length;
        const numberOfAssessments = employees.length;
        /**Calculate the averages */
        let averageSleepHours: number = 0;
        assessments.map(assessment => {
            averageSleepHours += (assessment.score as Score).TSTValue;
        });
        averageSleepHours = parseInt((averageSleepHours/completedAssessments).toFixed(1));
        return response.status(200).json({ message: 'Successful!', data: { averageSleepHours, numberOfAssessments, completedAssessments} })
    }
    catch(error){
        return response.status(500).json({ message: 'Internal Server Error' });
    }
}
