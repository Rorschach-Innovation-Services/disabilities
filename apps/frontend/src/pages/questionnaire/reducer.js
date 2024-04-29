export const initialState = {
    agreement: "",
    questionCount: 0,
    step: 0,
    questions: [],
    otherDisorder: "",
    employee: {
        name: "",
        email: "",
        idNumber: "",
        age: 0,
        gender: "",
    },
};

export const options = {
    1: {
        text: "This is the time that you close your eyes to start trying to sleep at night.",
    },
    2: {
        text: "This is the time that you open your eyes in the morning and stop trying to sleep - no longer sleeping, snoozing or dozing.",
    },
    3: {
        text: "E.g. 7.5",
    },
    4: {
        text: "1 being very poor and 10 being excellent.",
    },
    5: {
        text: "1 being not all and 10 being very much. For example, you might find that you are less productive, more forgetful, less creative, less able to multi-task, more moody and less able to control your emotions when you are sleep deprived.",
    },
    "6a": {
        text: "e.g. insomnia, sleep apnoea, restless legs syndrome, narcolepsy.",
    },
    "6b": {
        text: "",
    },
    "6c": {
        text: "A well-managed sleep disorder is one that is being treated so that you feel your sleep and daytime function have improved.",
    },
    7: {
        text: "This does not include melatonin, supplements, CBD products or other natural remedies.",
    },
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "step":
            return { ...state, step: action.payload };
        case "disorder":
            return { ...state, otherDisorder: action.payload };
        case "increment step":
            return { ...state, step: state.step + 1 };
        case "decrement step":
            return { ...state, step: state.step - 1 };
        case "agreement":
            return { ...state, agreement: action.payload };
        case "add response":
            const questions = [...state.questions];

            // Change only question supplied in payload
            for (let i = 0; i < questions.length; i++) {
                if (questions[i].id === action.payload.id) {
                    questions[i] = { ...questions[i], ...action.payload };
                }
            }

            return { ...state, questions };
        case "add question":
            return {
                ...state,
                questions: [...state.questions, action.payload],
            };
        case "question count":
            return { ...state, questionCount: action.payload };
        case "employee":
            return {
                ...state,
                employee: {
                    ...state.employee,
                    [action.payload.key]: action.payload.value,
                },
            };
        default:
            return { ...state };
    }
};
