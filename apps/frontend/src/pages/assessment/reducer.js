export const assessmentInitialState = {
  logo: {
    data: [],
    filename: '',
  },
  csv: {
    data: [],
    filename: '',
  },
  employees: [],
  company: {
    name: '',
    industry: '',
    employeeCount: 0,
    department: '',
  },
  consultant: {
    name: '',
    phone: '',
    email: '',
    sleepScienceConsultant: '',
  },
  questionnaires: [],
  selectedQuestionnaires: [],
  viewedQuestionnaire: null,
  selectedQuestions: [],
  selected: null,
  start: false,
};

export const assessmentReducer = (state, action) => {
  switch (action.type) {
    case 'logo':
      return { ...state, logo: action.payload };
    case 'selected questionnaire':
      return { ...state, selected: action.payload };
    case 'csv':
      return { ...state, csv: action.payload };
    case 'employee':
      return { ...state, employees: action.payload };
    case 'company name':
      return { ...state, company: { ...state.company, name: action.payload } };
    case 'company industry':
      return {
        ...state,
        company: { ...state.company, industry: action.payload },
      };
    case 'company employee count':
      return {
        ...state,
        company: { ...state.company, employeeCount: action.payload },
      };
    case 'consultant name':
      return {
        ...state,
        consultant: { ...state.consultant, name: action.payload },
      };
    case 'consultant phone':
      return {
        ...state,
        consultant: { ...state.consultant, phone: action.payload },
      };
    case 'consultant email':
      return {
        ...state,
        consultant: { ...state.consultant, email: action.payload },
      };
    case 'company department':
      return {
        ...state,
        company: { ...state.company, department: action.payload },
      };
    case 'sleep-science-consultant':
      return {
        ...state,
        consultant: {
          ...state.consultant,
          sleepScienceConsultant: action.payload,
        },
      };
    case 'reset':
      return assessmentInitialState;
    case 'select-questionnaire':
      return {
        ...state,
        selectedQuestionnaires: (() => {
          const selected = state.selectedQuestionnaires.includes(
            action.payload
          );
          if (selected) {
            return state.selectedQuestionnaires.filter(
              (item) => item !== action.payload
            );
          }
          return [...state.selectedQuestionnaires, action.payload];
        })(),
      };
    case 'unselect-questionnaires':
      return {
        ...state,
        selectedQuestionnaires: [],
      };
    case 'delete-questionnaires':
      return {
        ...state,
        questionnaires: state.questionnaires.filter(
          (item) => !state.selectedQuestionnaires.includes(item._id)
        ),
        selectedQuestionnaires: [],
      };
    case 'view-questionnaire':
      return {
        ...state,
        viewedQuestionnaire: action.payload,
      };
    case 'unview-questionnaire':
      return {
        ...state,
        viewedQuestionnaire: null,
      };
    case 'select-question':
      return {
        ...state,
        selectedQuestions: (() => {
          const selected = state.selectedQuestions.includes(action.payload);
          if (selected) {
            return state.selectedQuestions.filter(
              (item) => item !== action.payload
            );
          }
          return [...state.selectedQuestions, action.payload];
        })(),
      };
    case 'unselect-questions':
      return {
        ...state,
        selectedQuestions: [],
      };
    case 'delete-questions':
      return {
        ...state,
        questionnaires: (() => {
          const questionnaires = state.questionnaires;
          return questionnaires.map((questionnaire) => {
            if (questionnaire._id === action.payload) {
              const newQuestions = questionnaire.questionnaire.filter(
                (question) => !state.selectedQuestions.includes(question.id)
              );
              questionnaire.questionnaire = newQuestions;
              return questionnaire;
            }
          });
        })(),
        selectedQuestions: [],
      };
    case 'start-assessment':
      return {
        ...state,
        start: action.payload,
      };
    case 'get-questionnaires':
      return {
        ...state,
        questionnaires: action.payload,
      };
    default:
      return state;
  }
};
