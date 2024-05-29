/**
 * Save Assessment Controller
 */
import { Request, Response } from 'express';
import { Assessment, Employee, Company, Department } from '../../models';
import scoreSleepHealth from '../../utilities/score';
import generateReport from '../../utilities/genReport';
import { v4 } from 'uuid';

/**
 * Save Assessment Controller: Score assessment, save then send report to employee
 * @param req
 * @param res
 * @returns
 */
const saveAssessment = async (req: Request, res: Response) => {
  try {
    const { employee, questionnaire, company, department } = req.body;
    const assessmentScore = scoreSleepHealth(questionnaire);

    /**Check if the company exists in the database */
    const companyDocument = await Company.get({ id: company });
    if (!companyDocument) {
      return res.status(404).json({ message: 'Company not found' });
    }

    /**Check if the department exists in the database */
    const departmentDocument = await Department.get({
      id: department,
    });
    if (!departmentDocument) {
      return res.status(404).json({ message: 'Department not found' });
    }

    /**Check if the employee exists in the database */
    const employeeDoc = await Employee.get({
      id: employee,
    });
    if (!employeeDoc) {
      return res.status(404).json({ message: 'Employee Not Found!' });
    }

    const assessmentResponse = await Assessment.query(
      { companyId: companyDocument.id },
      { beginsWith: department }
    );
    const assessments = assessmentResponse.items || [];

    /**Limit the number of employee assessments a company needs to complete to not exceed the . */
    if (assessments.length === departmentDocument.employeeSize) {
      return res.status(403).json({
        message: 'Cannot Submit Assessment. Limit Exceeded!',
        employee: employeeDoc.id,
      });
    }

    /**Create and save the assessment */
    const assessment = await Assessment.create({
      employeeId: employee,
      questionnaire,
      score: assessmentScore,
      companyId: company,
      departmentId: department,
      deleted: false,
    });
    const reportRes = await generateReport(assessment);
    if (typeof reportRes !== 'undefined' && 'error' in reportRes) {
      return res.status(500).json({
        message: 'Something Went Wrong While generating report!',
        error: reportRes.error,
      });
    }
    return res.status(200).json({ message: 'Successful', data: reportRes });
  } catch (error) {
    console.log('error', error);
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export default saveAssessment;
