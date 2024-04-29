/**
 * Get a companies consulted by an admin
 */
import { Company, Admin } from "../../models";
import { Request, Response } from "express";
 
export default async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const company = await Company.findOne({_id: id});
    if (!company || company.deleted) {
      return response.status(400).json({ message: "Company Not Found" });
    }
    const admin = await Admin.findOne({ _id: company.admin })
    if(!admin){
      return response.status(400).json({ company, message: "Admin not found"})
    }
    return response.status(200).json({ company, admin: admin.name });
  } 
  catch (error) {
    return response.status(500).json({ message: "Internal Server Error" });
  }
};
 
 