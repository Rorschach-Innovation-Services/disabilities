/**
 * Get all companies consulted by an admin
 */
import { Assessment, Company } from "../../models";
import { Request, Response } from "express";
import { CompanyDocument } from "../../models/company.model";

export default async (_: Request, response: Response) => {
    try {
        const companies = await Company.find({ deleted: false });
        if (!companies) {
            return response.status(404).json({ message: "Companies Not Found" });
        }
        const existingCompanies = companies.filter(company => !company.deleted)
        const returnCompanies = Promise.all(existingCompanies.map(async (company) => {
            const assessments = await Assessment.find({ company: company._id });
            const employeesLength = company.employees.length;
            company.status = parseInt(`${(assessments.length) / (employeesLength)}`) === 1 ? "Profile Completed" : "In Progress";
            return company;
        }));
        returnCompanies.then(res => {
            const sortedCompanyList = res.sort((x: CompanyDocument, y: CompanyDocument) => { 
                // x.created = new Date(x.created)
                return Number(y.created) - Number(x.created);
            });
            return response.status(200).json({ companies: sortedCompanyList });
        })
            ;
    } catch (error) {
        return response.status(500).json({ message: "Internal Server Error" });
    }
};
