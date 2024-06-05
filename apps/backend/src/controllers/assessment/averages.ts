import { Assessment, Employee } from '../../models';
import { Score } from '../../models/assessment.model';

export const getAverages = async () => {
  try {
    const employeesResponse = await Employee.query(
      { _en: 'employee' },
      { index: 'gsIndex' }
    );
    const employees = employeesResponse.items || [];
    const assessmentResponse = await Assessment.query(
      { _en: 'assessment' },
      { index: 'gsIndex' }
    );
    const assessments = assessmentResponse.items || [];
    if (!assessments) {
      return { message: 'Assessments Not Found!' };
    }
    /**Number of Assessments */
    const completedAssessments = assessments.length;
    const numberOfAssessments = employees.length;
    /**Calculate the averages */
    let averageSleepHours: number = 0;
    console.log("assessments", assessments)
    assessments.map((assessment) => {
      averageSleepHours += (assessment.score as Score).TSTValue;
    });
    if(completedAssessments > 0)averageSleepHours = parseInt(
      (averageSleepHours / completedAssessments).toFixed(1)
    );
    return {
      message: 'Successful!',
      data: { averageSleepHours, numberOfAssessments, completedAssessments },
    };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
