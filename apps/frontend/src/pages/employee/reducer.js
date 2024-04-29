export const initialState = {
    employee: {
        name: "",
        email: "",
        idNumber: "",
        age: 0,
        gender: "",
        questionnaire: [],
        id: "",
    },
    company: {
        id: "",
        name: "",
        sector: "",
        employeesAssessed: 0,
        consultantName: "",
        consultantEmail: "",
        consultantPhone: "",
    },
    edit: false,
    editQuestion: {
        editting: false,
        name: "",
        id: "",
        title: "",
    },
    showWarning: false,
    showSuccess: false,
    showCancelWarning: false,
    error: "",
};

const idMapping = {
    5: "6a",
    6: "6b",
    7: "6c",
    8: "7",
};

const resetQuestion = (state, id) => {
    const result = [...state.employee.questionnaire];

    for (let i = 0; i < result.length; i++) {
        if (
            (result[i].id < 5 && result[i].id.toString() === id) ||
            idMapping[result[i]] === id
        )
            result[i] = { ...state.staticEmployee[i] };
    }
    return result;
};

export const employeeReducer = (state, action) => {
    switch (action.type) {
        case "add data": {
            const { employee, company } = action.payload;
            return {
                ...state,
                employee: {
                    name: employee.name,
                    email: employee.email,
                    idNumber: employee.id_number,
                    age: employee.age,
                    gender: employee.gender,
                    questionnaire: employee.assessment ? employee.assessment.questionnaire : [],
                    id: employee._id,
                },
                company: {
                    name: company.name,
                    sector: company.sector,
                    employeesAssessed: company.employees.length,
                    consultantName: company.hrConsultantName,
                    consultantEmail: company.hrConsultantEmail,
                    consultantPhone: company.phone,
                    id: company._id,
                },
                staticEmployee: {
                    name: employee.name,
                    email: employee.email,
                    idNumber: employee.id_number,
                    age: employee.age,
                    gender: employee.gender,
                    questionnaire: employee.assessment ? employee.assessment.questionnaire : [],
                    id: employee._id,
                },
            };
        }
        case "questionnaire": {
            const { index, value } = action.payload;
            const questionnaire = [...state.employee.questionnaire];
            questionnaire[index].response = value;
            return { ...state, employee: { ...state.employee, questionnaire } };
        }
        case "employee": {
            const { key, value } = action.payload;
            return { ...state, employee: { ...state.employee, [key]: value } };
        }
        case "company": {
            const { key, value } = action.payload;
            return { ...state, company: { ...state.company, [key]: value } };
        }
        case "add response": {
            const { id, response } = action.payload;
            const questionnaire = [...state.employee.questionnaire];

            for (let i = 0; i < questionnaire.length; i++) {
                const question = questionnaire[i];
                if (question.id === id) {
                    question.response = response;
                }
            }
            return { ...state, employee: { ...state.employee, questionnaire } };
        }
        case "general": {
            const { key, value } = action.payload;
            return { ...state, [key]: value };
        }
        case "edit question": {
            // payload takes shape of the editQuestion key of state
            return {
                ...state,
                editQuestion: { ...state.editQuestion, ...action.payload },
            };
        }
        case "reset employee": {
            return {
                ...state,
                edit: false,
                employee: { ...state.staticEmployee },
            };
        }
        case "reset question": {
            const { id, name } = action.payload;
            console.log("id", id);
            console.log("name", name);

            if (name === "name")
                return {
                    ...state,
                    employee: {
                        ...state.employee,
                        name: state.staticEmployee.name,
                    },
                };
            else if (name === "email")
                return {
                    ...state,
                    employee: {
                        ...state.employee,
                        email: state.staticEmployee.email,
                    },
                };
            else if (name === "age")
                return {
                    ...state,
                    employee: {
                        ...state.employee,
                        age: state.staticEmployee.age,
                    },
                };
            else if (name === "idNumber")
                return {
                    ...state,
                    employee: {
                        ...state.employee,
                        idNumber: state.staticEmployee.idNumber,
                    },
                };
            else if (name === "gender")
                return {
                    ...state,
                    employee: {
                        ...state.employee,
                        gender: state.staticEmployee.gender,
                    },
                };

            if (id)
                return {
                    ...state,
                    employee: {
                        ...state.employee,
                        questionnaire: resetQuestion(state, id),
                    },
                };
            return state;
        }
        default:
            return state;
    }
};
