import { QuestionnaireQuestionItem } from 'src/models/questionnaire.model';
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
  const metricNames = ['Plan/Prepare', 'Integrate', 'Value-Add', 'Optimise', 'Transfer'];
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
  color: string;
  data: [number, number][];
}[];

export const getDoAbilityMatrix = async (
  assessments: AssessmentAttributes[],
) => {
  const data = await getCurrentAgainstImportance(assessments);
  const metricNames = ['Plan/Prepare', 'Integrate', 'Value-Add', 'Optimise', 'Transfer'];
  const result: DoAbilityMatrixSeries = [];
  metricNames.forEach((name) => {
    const value = data[name];
    const metricData: [number, number] = [0, 0];
    Object.keys(value).forEach((label) => {
      if (label === 'Do Ability') metricData[1] = getAverage(value[label]);
      else if (label === 'Important to us')
        metricData[0] = getAverage(value[label]);
    });
    result.push({ name, data: [metricData], color: getQuestionColor(name).color });
  });
  return result;
};

interface QuestionGroup {
  questionIds: string[];
  title: string;
  color: string;
  similarQuestions?: {
    questionId: string;
    title: string;
    similarity: number;
  }[];
} 
// Default to top 10 items
const getQuestionColor = (label: string) => {
  switch (label.toLowerCase()) {
    case 'Plan/Prepare':
      return { color: '#0074D9' };  
    case 'Integrate':
      return { color: '#2ECC40' };  
    case 'Value-Add':
      return { color: '#FFDC00' };  
    case 'Optimise':
      return { color: '#FF851B' };  
    case 'Transfer':
      return { color: '#B10DC9' };  
    default:
      return { color: '#ddd' };  
  }
};
  // Helper function to calculate string similarity using Levenshtein distance
  function calculateSimilarity(str1: string, str2: string): number {
    if (str1 === str2) return 1;
    
    const len1 = str1.length;
    const len2 = str2.length;
    const matrix: number[][] = Array(len1 + 1).fill(null).map(() => Array(len2 + 1).fill(0));

    for (let i = 0; i <= len1; i++) matrix[i][0] = i;
    for (let j = 0; j <= len2; j++) matrix[0][j] = j;

    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }

    const distance = matrix[len1][len2];
    const maxLength = Math.max(len1, len2);
    return 1 - distance / maxLength;
}

function findSimilarQuestions(questionMapping: Record<string, string>,labelMapping: Record<string, string>): QuestionGroup[] {

  const questionGroups: QuestionGroup[] = [];
  const processedIds = new Set<string>();

  // Threshold for considering questions similar (90% similarity)
  const SIMILARITY_THRESHOLD = 0.9;

  // Process each question
  Object.entries(questionMapping).forEach(([currentId, currentTitle]) => {
    if (processedIds.has(currentId)) return;

    const group: QuestionGroup = {
      questionIds: [currentId],
      title: currentTitle,
      similarQuestions: [],
      color: getQuestionColor(labelMapping[currentId]).color
    };

    // Compare with remaining questions
    Object.entries(questionMapping).forEach(([otherId, otherTitle]) => {
      if (currentId === otherId || processedIds.has(otherId)) return;

      const similarity = calculateSimilarity(
        currentTitle.toLowerCase(),
        otherTitle.toLowerCase()
      );

      if (similarity >= SIMILARITY_THRESHOLD) {
        group.questionIds.push(otherId);
        group.similarQuestions?.push({
          questionId: otherId,
          title: otherTitle,
          similarity
        });
        processedIds.add(otherId);
      }
    });

    questionGroups.push(group);
    processedIds.add(currentId);
  });

  // Sort groups by size (number of similar questions) in descending order
  return questionGroups.sort((a, b) => b.questionIds.length - a.questionIds.length);
}

type ResponseData = {
  'Current Status'?: number[];
  'Do Ability'?: number[];
  'Important to us'?: number[];
};

interface ConsolidatedData {
  [questionId: string]: ResponseData;
}

// Create a mapping of each question ID to its base ID
function createQuestionIdMapping(questionMapping: Record<string, string>,labelMapping: Record<string, string>): Record<string, string> {
  const groups = findSimilarQuestions(questionMapping,labelMapping);
  const idToBaseId: Record<string, string> = {};
  
  // Pre-compute mapping for all question IDs - O(n) where n is total number of questions
  groups.forEach(group => {
    const baseId = group.questionIds[0];
    group.questionIds.forEach(id => {
      idToBaseId[id] = baseId;
    });
  });
  
  return idToBaseId;
}

function consolidateQuestionData(
  data: Record<string, Record<string, number[]>>, 
  questionMapping: Record<string, string>,
  labelMapping: Record<string, string>,
): ConsolidatedData {
  // Pre-compute the ID mapping once - O(n)
  const idToBaseId = createQuestionIdMapping(questionMapping,labelMapping);
  const consolidatedData: ConsolidatedData = {};
  
  // Process each entry in the input data - O(m) where m is number of entries
  Object.entries(data).forEach(([questionId, responses]) => {
    // O(1) lookup instead of O(n) search
    const baseId = idToBaseId[questionId] || questionId;
    
    // Initialize if needed
    if (!consolidatedData[baseId]) {
      consolidatedData[baseId] = {};
    }
    
    // Add each response type
    Object.entries(responses).forEach(([responseType, values]) => {
      if (!consolidatedData[baseId][responseType]) {
        consolidatedData[baseId][responseType] = values;
      }
    });
  });
  
  return consolidatedData;
}

type MatrixItem = {
  name: string;
  data: [number, number, number][];
  color: string;
};

type MatrixSeries = MatrixItem[]; 
type MatrixType = 'high' | 'low';

// Cache for question titles to avoid repeated lookups
interface TitleCache {
  [questionId: string]: string;
}
interface PriorityConfig {
  topCount: number;          // Number of top priority items to keep
  referencePoint: {          // Reference point for distance calculation
    high: [number, number];  // [importance, ability] for high priority
    low: [number, number];   // [importance, ability] for low priority
  };
}

// Helper function to calculate Euclidean distance
function calculateEuclideanDistance(
  point1: [number, number],
  point2: [number, number]
): number {
  const [x1, y1] = point1;
  const [x2, y2] = point2;
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Helper function to calculate priority score
function calculatePriority(
  importance: number,
  ability: number,
  type: MatrixType,
  config: PriorityConfig
): number {
  const point: [number, number] = [importance, ability];
  const referencePoint = config.referencePoint[type];
  return calculateEuclideanDistance(point, [0,0]);
}



// Helper function to create shortened names consistently
function createShortName(fullTitle: string): string {
  const words = fullTitle.split(' ');
  return `${words.slice(0,4).join(" ")}`.trim();
}

// Pre-compute question titles for efficient lookup
function createTitleCache(groupedQuestions: QuestionGroup[]): TitleCache {
  const cache: TitleCache = {};
  
  groupedQuestions.forEach(group => {
    const shortTitle = createShortName(group.title);
    group.questionIds.forEach(id => {
      cache[id] = shortTitle;
    });
  });
  
  return cache;
}

// Modified threshold function to include priority
function meetsThreshold(
  importance: number,
  ability: number,
  type: MatrixType,
  priority: number,
  selectedPriorities: Set<number>
): boolean {
  const THRESHOLD = 2.5;

  const basicCriteria = type === 'high' 
    ? (ability >= THRESHOLD && importance >= THRESHOLD)
    : (ability <= THRESHOLD && importance >= THRESHOLD);

  // return basicCriteria && selectedPriorities.has(priority);
  return selectedPriorities.has(priority);
}

// Main function to generate matrix data
function processMatrixWithPriority(
  consolidatedData: ConsolidatedData,
  groupedQuestions: QuestionGroup[],
  type: MatrixType,
  config: PriorityConfig,
  labelMapping: Record<string, string>,
): MatrixSeries {
  const titleCache = createTitleCache(groupedQuestions);

  // Step 1: Calculate priorities for all points
  const itemsWithPriority = Object.entries(consolidatedData)
    .map(([id, value]): MatrixItem & { priority: number } => {
      const importance = getAverage(value['Important to us'] || []);
      const ability = getAverage(value['Do Ability'] || []);
      const priority = calculatePriority(importance, ability, type, config);

      return {
        name: titleCache[id] || id,
        data: [[importance, ability, 20]],
        priority,
        color: getQuestionColor(labelMapping[id]).color
      };
    });

  // Step 2: Sort by priority and select top items
  const sortedItems = [...itemsWithPriority].sort((a, b) => {
    return type === 'high' 
      ? a.priority - b.priority  // For high priority, smaller distance is better
      : b.priority - a.priority; // For low priority, larger distance is better
  });

  // Step 3: Get the priorities of selected items
  const selectedPriorities = new Set(
    sortedItems
      .slice(0, config.topCount)
      .map(item => item.priority)
  );

  // Step 4: Filter based on both threshold and priority
  return itemsWithPriority
    .filter(item => {
      const [importance, ability] = item.data[0];
      return meetsThreshold(
        importance,
        ability,
        type,
        item.priority,
        selectedPriorities
      );
    });
}

// Example usage function
function generateMatrix(
  data: ConsolidatedData,
  groupedQuestions: QuestionGroup[],
  type: MatrixType,
  labelMapping: Record<string, string>,
  topCount: number = 25
): MatrixSeries {
  const priorityConfig: PriorityConfig = {
    topCount,
    referencePoint: {
      high: [5, 5],  // Ideal point for high priority (max importance, max ability)
      low: [0, 0]    // Ideal point for low priority (max importance, min ability)
    }
  };

  return processMatrixWithPriority(
    data,
    groupedQuestions,
    type,
    priorityConfig,
   labelMapping 
  );
}



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
  )
  const questionMapping: Record<string,string> = {};
  const questionLabelMapping: Record<string,string> = {};
  questionnaireResponses.items.filter(questionnaire => (questionnaire.order === 1 || questionnaire.order === 2) &&
        !questionnaire.deleted).forEach((questionnaire) => {
    questionnaire.questions.forEach((question) => {
      questionMapping[question.id] = question.question;
      questionLabelMapping[question.id] = question.category;
    });
  });

  const temp: Record<string, Record<string, number[]>> = {};
  relevantAssessments.forEach((assessment) => {
    assessment.questionnaire.forEach((question) => {
      if (!question.question.includes('email')) {
        const questionKey = question.id;
        const labelKey = question.label;
        if (!temp[questionKey]) temp[questionKey] = {};
        if (!temp[questionKey][labelKey]) temp[questionKey][labelKey] = [];
        temp[questionKey][labelKey].push(question.response as number);
      }
    });
  });
const groupedQuestions =  findSimilarQuestions(questionMapping,questionLabelMapping);
const questionData =  consolidateQuestionData(temp,questionMapping,questionLabelMapping);
return generateMatrix(questionData,groupedQuestions,type,questionLabelMapping);
};