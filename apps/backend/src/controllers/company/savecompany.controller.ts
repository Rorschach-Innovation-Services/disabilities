/**
 * Save Company Controllers
 */
import { Company, Employee } from "../../models";
import { Request, Response } from "express";
import emailSend from "../../utilities/sendEmail";
import Department, { DepartmentDocument } from "../../models/department.model";
import { ObjectId } from "mongoose";

/**
 * Save the company and if employees found, send them emails
 */
export default async (request: Request, response: Response) => {
  try {
    const {
      id,
      name,
      sector,
      hrConsultantName,
      hrConsultantEmail,
      logo,
      employees,
      employeeSize,
      phone,
      department,
      admin,
    } = request.body;
    if (id === null) {
      const company = new Company({
        name,
        sector,
        hrConsultantName,
        hrConsultantEmail,
        logo,
        employeeSize,
        phone,
        admin,
      });
      company
        .save()
        .then((company) => {
          const departmentDoc = new Department({
            name: department,
            company: company._id,
            employeeSize,
          });
          departmentDoc.save().then((department: DepartmentDocument) => {
            // add first department to the new company department list
            company.departments = [department._id];
            /** Register employees if found. */
            if (employees && employees.length > 0) {
              employees.forEach((employee: any) => {
                // give each employee company and department id's
                employee.department = department._id;
                employee.company = company._id;
              });
              const employeesList = Employee.insertMany(employees);
              employeesList
                .then(async (employees: any) => {
                  await employees.forEach(async (employee: any) => {
                    const emailSubject = "Welcome to the Sleep Science Wellness Assessment";
                    const emailMessage = `Please complete the following questions for our team to determine your sleep score. Please click the link to access the sleep assessment: http://www.sleepscience.co.za/questionnaire/${company._id}/${department._id}/${employee._id}`;
                    company.employees.push(employee._id);
                    department.employees.push(employee._id);
                    await emailSend(
                      employee.email,
                      employee.name,
                      emailSubject,
                      emailMessage
                    );
                  });
                  await company.save();
                  await department.save();
                  return response
                    .status(200)
                    .json({ message: "Company, department and employees registered!" });
                })
                .catch((error) => {
                  console.log("Error: ", error);
                  return response.json({ message: error.message });
                });
            } else {
              /**Register company and department only */
              company.save()
              .then(company => {
                return response
                  .status(200)
                  .json({
                    message: "Company Registered!",
                    company: company._id,
                    department: department._id
                  });
              })
              .catch((error) => {
                return response.status(500).json({message: "Error while saving company. Empty employee list. After saving department.", error})
              })
            }
          })
        })
        .catch((error) => {
          if (error.code === 11000) {
            return response
              .status(409)
              .send({ message: "Company Aready Exists." });
          }
          console.log("Error: ", error);
          return response.status(400).json({ message: error.message });
        });
    } else {
      const company = await Company.findOne({ _id: id });
      if (!company)
        return response.status(400).json({ message: "Company not found" });
      const departmentDoc = new Department({
        name: department,
        company: company._id,
        employeeSize,
      });
      departmentDoc
        .save()
        .then((department) => {
          company.departments = [department._id, ...company.departments];
          /** Register employees if found. */
          if (employees && employees.length > 0) {
            employees.forEach((employee: any) => {
              employee.department = department._id;
              employee.company = company._id;
            });
            const employeesList = Employee.insertMany(employees);
            employeesList
              .then(async (employees: any) => {
                await employees.forEach(async (employee: any) => {
                  const emailSubject =
                    "Welcome to the Sleep Science Wellness Assessment";
                  const emailMessage = `Please complete the following questions for our team to determine your sleep score. Please click the link to access the sleep assessment: http://www.sleepscience.co.za/questionnaire/${company._id}/${department._id}/${employee._id}`;
                  company.employees.push(employee._id);
                  department.employees.push(employee._id);
                  await emailSend(
                    employee.email,
                    employee.name,
                    emailSubject,
                    emailMessage
                  );
                });
                await company.save();
                await department.save();
                return response
                  .status(200)
                  .json({ message: "Company Registered!" });
              })
              .catch((error) => {
                console.log("Error: ", error);
                return response.json({ message: error.message });
              });
          } else {
            /**Register company only */
            company.save()
              .then(company => {
                return response
                  .status(200)
                  .json({
                    message: "Company Registered!",
                    company: company._id,
                    department: department._id
                  });
              })
              .catch((error) => {
                return response.status(500).json({message: "Error while saving existing company. Empty employee list. After saving department.", error})
              })
            }
        })
        .catch((error) => {
          return response
            .status(500)
            .send({ message: "error while saving department.", error });
        });
    }
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Internal Server Error", error });
  }
};
