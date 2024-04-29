/**
 * Controllers for Creating and Sending Platform Questions
 */
import { Question } from '../../models/index';
import { Request, Response } from 'express';

/**
 * Create platform questions controller
 */
export const createQuestion = async (request: Request, response: Response) => {
    try{
        const { id, content } = request.body;
        const question = new Question({ id, content });
        question
            .save()
                .then(question => {
                    return response.status(200).json({ message: "Question Created" });
                })
                .catch(error => {
                    return response.status(500).json({ message: "Internal Server Error" });
                });
    }
    catch(error){
        return response.status(500).json({ message: 'Internal Server Error' });
    }
}

/**
 * Send Questions to the client
 */
export const sendQuestions = async (request: Request, response: Response) => {
    try{
        const questions = await Question.find();
        if(questions){
            return response.status(200).json({questions});
        }
        return response.status(404).json({ message: "Questions Not Found!" });
    }
    catch(error){
        return response.status(500).json({ message: "Internal Server Error" });
    }
}
