export const dashboardInitialState = {
    selectedClient: {},
    clients: [],
    averageSleepingHours: 0,
    assessmentCount: 0,
    averageSleepRating: 0,
    completedAssessments: 0,
    tasks: []
};
  
export const dashboardReducer = (state, action) => {
    switch (action.type) {
        case "client":
            return { ...state, selectedClient: action.payload };
        case "clients":
            return {
            ...state,
            clients: action.payload,
            selectedClient: action.payload ? action.payload[0]:[],
            };
        case "averages":
            return { ...state, ...action.payload };
        case "tasks":
            return { ...state, tasks: action.payload }
        case "delete-task":
            return { 
                ...state, 
                tasks: state.tasks.filter(task => task._id !== action.payload) 
            }
        case "create-task":
            return { 
                ...state, 
                tasks: [...state.tasks, action.payload] 
            }
        case "complete-task":
            return { 
                ...state,
                tasks: state.tasks.map(task => {
                    if(task._id === action.payload.id){
                        task.complete = action.payload.complete;
                        return task;
                    }
                    return task;
                }) 
            }
        default:
            return state;
    }
};