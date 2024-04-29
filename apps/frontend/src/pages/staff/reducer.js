export const initialStaffState = {
    viewedStaffMember: {},
    staffMembers: [],
    adminClients: []
}

export const StaffReducer = (state, action) => {
    switch(action.type){
        case "view-staff-member":
            return{
                ...state,
                viewedStaffMember: action.payload
            }
        case "get-staff-members":
            return{
                ...state,
                staffMembers: action.payload
            }
        case "get-staff-clients":
            return{
                ...state,
                adminClients: action.payload
            }
        default:
            return state;
    }
}