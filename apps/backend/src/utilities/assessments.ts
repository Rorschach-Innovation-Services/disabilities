import { Questionnaire } from '../models';
import { AssessmentAttributes } from '../models/assessment.model';

type MetricItemValues = {
  string: {
    // category: Engage, Attract, Nest, Back, Learn
    string: number; // label: Important to us, Do Ability, Current Status
  };
};

export const getCurrentAgainstImportance = async (
  assessments: AssessmentAttributes[],
) => {
  const questionnaireResponses = await Questionnaire.query(
    { _en: 'questionnaire' },
    { index: 'gsIndex' },
  );
  const questionnaireIds = questionnaireResponses.items
    .filter(
      (questionnaire) =>
        (questionnaire.order === 1 || questionnaire.order === 2) &&
        !questionnaire.deleted,
    )
    .map((item) => item.id);
  if (questionnaireIds.length === 0) return {};
  const relevantAssessments = assessments.filter((item) =>
    questionnaireIds.includes(item.questionnaireId),
  );
  const result: Record<string, Record<string, number[]>> = {};

  relevantAssessments.forEach((assessment) => {
    assessment.questionnaire.forEach((question) => {
      if (!question.question.includes('email')) {
        const categoryKey = question.category;
        const labelKey = question.label;
        if (!result[categoryKey]) result[categoryKey] = {};
        if (!result[categoryKey][labelKey]) result[categoryKey][labelKey] = [];
        result[categoryKey][labelKey].push(question.response as number);
      }
    });
  });
  return result;
};

const getAverage = (list: number[]) => {
  //get average of the list accurate to 1 decimal point
  const sum = list.reduce((sum, number) => sum + number, 0);
  const average = sum / list.length;
  return parseFloat(average.toFixed(1));
};

type ChartItem = {
  name: string;
  data: number[];
  color: string;
};

export const getRadarChartValues = async (
  assessments: AssessmentAttributes[],
) => {
  const data = await getCurrentAgainstImportance(assessments);
  const currentStatusItem: ChartItem = {
    name: 'Current Status',
    data: [],
    color: '#00FF00', // Green color
  };
  const importantItem: ChartItem = {
    name: 'Important to us',
    data: [],
    color: '#FF0000', // Green color
  };
  const metricNames = ['Engage', 'Nest', 'Attract', 'Back', 'Learn'];
  metricNames.forEach((name) => {
    const value = data[name];
    Object.keys(value).forEach((label) => {
      if (label === 'Current Status')
        currentStatusItem.data.push(getAverage(value[label]));
      else if (label === 'Important to us')
        importantItem.data.push(getAverage(value[label]));
    });
  });
  return [currentStatusItem, importantItem];
};

type DoAbilityMatrixSeries = {
  name: string;
  data: [number, number][];
}[];

export const getDoAbilityMatrix = async (
  assessments: AssessmentAttributes[],
) => {
  const data = await getCurrentAgainstImportance(assessments);
  const metricNames = ['Engage', 'Nest', 'Attract', 'Back', 'Learn'];
  const result: DoAbilityMatrixSeries = [];
  metricNames.forEach((name) => {
    const value = data[name];
    const metricData: [number, number] = [0, 0];
    Object.keys(value).forEach((label) => {
      if (label === 'Do Ability') metricData[1] = getAverage(value[label]);
      else if (label === 'Important to us')
        metricData[0] = getAverage(value[label]);
    });
    result.push({ name, data: [metricData] });
  });
  return result;
};

type MatrixSeries = {
  name: string;
  data: [number, number, number][];
}[];

export const getHighMatrix = async (
  assessments: AssessmentAttributes[],
  type: 'low' | 'high',
) => {
  const questionnaireResponses = await Questionnaire.query(
    { _en: 'questionnaire' },
    { index: 'gsIndex' },
  );
  const questionnaireIds = questionnaireResponses.items
    .filter(
      (questionnaire) =>
        (questionnaire.order === 1 || questionnaire.order === 2) &&
        !questionnaire.deleted,
    )
    .map((item) => item.id);
  if (questionnaireIds.length === 0) return {};
  const relevantAssessments = assessments.filter((item) =>
    questionnaireIds.includes(item.questionnaireId),
  );

  const temp: Record<string, Record<string, number[]>> = {};
  relevantAssessments.forEach((assessment) => {
    assessment.questionnaire.forEach((question) => {
      if (!question.question.includes('email')) {
        const questionKey = question.question;
        const labelKey = question.label;
        if (!temp[questionKey]) temp[questionKey] = {};
        if (!temp[questionKey][labelKey]) temp[questionKey][labelKey] = [];
        temp[questionKey][labelKey].push(question.response as number);
      }
    });
  });
  console.log('Temp ', temp);
  const result: MatrixSeries = [];
  Object.keys(temp).forEach((name) => {
    const value = temp[name];
    const metricData: [number, number, number] = [0, 0, 20];
    Object.keys(value).forEach((label) => {
      if (label === 'Do Ability') metricData[1] = getAverage(value[label]);
      else if (label === 'Important to us')
        metricData[0] = getAverage(value[label]);
    });
    const splitName = name.split(' ');
    const shortName = splitName[0] + ' ' + splitName[1];
    if (type === 'high' && metricData[1] >= 2.5 && metricData[0] >= 2.5)
      result.push({ name: shortName, data: [metricData] });
    if (type === 'low' && metricData[1] <= 2.5 && metricData[0] >= 2.5)
      result.push({ name: shortName, data: [metricData] });
  });
  return result;
};
