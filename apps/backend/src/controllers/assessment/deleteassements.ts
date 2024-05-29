import { Assessment } from '../../models/assessment.model';

type Parameters = {
  assessmentDates: {
    companyId: string;
    departmentId: string;
    employeeId: string;
    id: string;
  }[];
};

export const deleteAssessments = async ({ assessmentDates }: Parameters) => {
  try {
    for (const data of assessmentDates) {
      await Assessment.update(
        {
          companyId: data.companyId,
          departmentId: data.departmentId,
          employeeId: data.employeeId,
          id: data.id,
        },
        {
          deleted: true,
        }
      );
    }
    return { message: 'Assessments successfully deleted' };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
