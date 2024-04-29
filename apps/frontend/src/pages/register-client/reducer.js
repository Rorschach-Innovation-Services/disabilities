export const assessmentInitialState = {
    logo: {
      data: [],
      filename: "",
    },
    csv: {
      data: [],
      filename: "",
    },
    employees: [],
    company: {
      name: "",
      sector: "",
      department: "",
      logo: "",
      employeeCount: 0,
      department: "",
      id: ""
    },
    consultant: {
      name: "",
      phone: "",
      email: "",
      sleepScienceConsultant: {
        name: "",
        _id: ""
      }
    },
  };
  
export const assessmentReducer = (state, action) => {
    switch (action.type) {
        case "logo":
            return { ...state, logo: action.payload };
        case "csv":
            return { ...state, csv: action.payload };
        case "employee":
            return { ...state, employees: action.payload };
        case "company name":
            return { ...state, company: { ...state.company, name: action.payload } };
        case "company sector":
            return {
                ...state,
                company: { ...state.company, sector: action.payload },
            };
        case "company employee count":
            return {
                ...state,
                company: { ...state.company, employeeCount: action.payload },
            };
        case "consultant name":
            return {
                ...state,
                consultant: { ...state.consultant, name: action.payload },
            };
        case "consultant phone":
            return {
                ...state,
                consultant: { ...state.consultant, phone: action.payload },
            };
        case "consultant email":
            return {
                ...state,
                consultant: { ...state.consultant, email: action.payload },
            };
        case "company department":
            return {
                ...state,
                company: { ...state.company, department: action.payload },
            };
        case "sleep-science-consultant":
            return {
                ...state,
                consultant: { ...state.consultant, sleepScienceConsultant: action.payload },
            };
        case "set-logo":
            return {
                    ...state,
                    company: { ...state.company, logo: action.payload },
            };
        case "reset":
            return assessmentInitialState;
        default:
            return state;
    }
  };
  