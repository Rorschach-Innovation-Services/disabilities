/**
 * Score Response of the employees
 */

interface Question {
  id: string;
  content: string;
  response: string;
}

/**
 * Score each response
 * @param questionnaire The list of questions with responses.
 * @returns An object with the scored questionnaire and other scores: { questionnaireScores, DisorderModifiedValue, TotalValue, MedModifiedTotalValue, SleepHealthScore, SleepHealthScorePercentage }
 */
const calculatedScore = (questionnaire: Question[]) => {
  return {};
};

export default scoreSleepHealth;
