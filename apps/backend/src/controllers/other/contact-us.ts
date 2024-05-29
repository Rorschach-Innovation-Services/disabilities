/**
 * Contact Us Controller
 */
import { Request, Response } from 'express';
import emailSend from '../../utilities/sendEmail';

/**
 * Send a contact us email to admin
 * @param request 
 * @param response 
 * @returns 
 */
const contactUs = (request: Request, response: Response) => {
    try{
        const { subject, message } = request.body;
        emailSend('info@sleepscience.co.za', 'Admin', subject, message)
        .then(res => {
            return response.status(200).json({ message: 'Sent email successfully!' });
        })
        .catch(error => {
            return response.status(500).json({ message: 'Something Went Wrong!' });
        })
    }
    catch(error){
        return response.status(500).json({ message: 'Internal Server Error' });
    }
}

export default contactUs;