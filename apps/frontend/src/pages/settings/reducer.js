export const initialSettingsState = {
    admin: null,
    option: "profile",
    name: "",
    company: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
    email: "",
    secondaryEmail: "",
    location: "",
    role: "",
    bio: "",
    photo: "",
    photoData: {
        data: [],
        filename: "",
    }
}
export const SettingsReducer = (state, action) => {
    switch(action.type){
        case "get-admin-data":
            return {
                ...state,
                admin: action.payload
            }
        case "change-option":
            return {
                ...state,
                option: action.payload
            }
        case "set-password":
            return {
                ...state,
                password: action.payload
            }
        case "set-new-password":
            return {
                ...state,
                newPassword: action.payload
            }
        case "set-confirm-password":
            return {
                ...state,
                confirmPassword: action.payload
            }
        case "set-name":
            return {
                ...state,
                name: action.payload
            }
        case "set-location":
            return {
                ...state,
                location: action.payload
            }
        case "set-email":
            return {
                ...state,
                email: action.payload
            }
        case "set-sec-email":
            return {
                ...state,
                secondaryEmail: action.payload
            }
        case "set-company":
            return {
                ...state,
                company: action.payload
            }
        case "set-bio":
            return {
                ...state,
                bio: action.payload
            }
        case "set-role":
            return {
                ...state,
                role: action.payload
            }
        case "set-photo":
            return {
                ...state,
                photo: action.payload
            }
        case "set-photo-data":
            return {
                ...state,
                photo: action.payload
            }
        default:
            return state;
    }
}