/**
 * Employee Controllers
 */
import { Employee, Company, Department } from "../../models";
import { Request, Response } from "express";

/**
 * Save an Employee To The Platform
 */
export const saveEmployee = async (request: Request, response: Response) => {
  console.log("Called");
  try {
    const { company, name, email, age, gender, phone, id_number, department } =
      request.body;
    console.log("company", company);
    const companyDoc = await Company.findById(company);
    if (!companyDoc) {
      return response.status(404).json({ message: "Company Not Found!" });
    }
    
    /**Check if the department exists in the database */
    const departmentDocument = await Department.findById(department);
    if (!departmentDocument) {
      return response.status(404).json({ message: "Department not found" });
    }

    const employeeDoc = await Employee.findOne({ email });
    if (employeeDoc) {
      employeeDoc.company = company;
      employeeDoc.department = departmentDocument._id;
      employeeDoc.age = age;
      employeeDoc.gender = gender;
      employeeDoc.phone = phone;
      employeeDoc.id_number = id_number;

      const savedEmployee = await employeeDoc.save();
      companyDoc.employees.push(savedEmployee._id);
      departmentDocument.employees.push(savedEmployee._id);
      await companyDoc.save();
      await departmentDocument.save();

      return response
        .status(200)
        .json({ message: "Employee Saved Successfully" });
    }
    const employee = new Employee({
      company,
      name,
      email,
      age,
      gender,
      phone,
      id_number,
    });
    const savedEmployee = await employee.save();
    companyDoc.employees.push(savedEmployee._id);
    departmentDocument.employees.push(savedEmployee._id);
    await companyDoc.save();
    await departmentDocument.save();
    return response
      .status(200)
      .json({ message: "Employee Saved Successfully", employee: employee._id });
  } catch (error) {
    if ((error as any).code === 11000) {
      return response.status(409).send({ message: "Employee Aready Exists." });
    }

    return response.status(500).json({ message: "Internal Server Error" });
  }
};
