/**
 * Responsible for marking a list of companies as deleted but not deleting from db
 *
 * */
 import { Request, Response } from "express";
import { Assessment, Department, Employee } from "../../models";
 import Company from "../../models/company.model";
import { DepartmentDocument } from "../../models/department.model";
 
 export const deleteCompany = async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const updateCompanyRes = await Company.findByIdAndUpdate(id, { deleted: true });
        console.log(updateCompanyRes)
        // if(updateCompanyRes && updateCompanyRes.acknowledged)
        await Department.updateMany({ company: id }, { deleted: true });
        await Employee.updateMany({ company: id }, { deleted: true });
        await Assessment.updateMany({ company: id }, { deleted: true });
        
        response.status(200).json({ message: "Company successfully deleted" });
    } 
    catch (error) {
        return response.status(500).json({ message: "Internal Server Error" });
    }
 };
 