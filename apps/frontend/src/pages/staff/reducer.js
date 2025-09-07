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
        case "remove-staff-member":
            return {
                ...state,
                staffMembers: (state.staffMembers || []).filter((m) => (m?.id || m?._id) !== action.payload),
                viewedStaffMember: {},
                adminClients: [],
            }
        default:
            return state;
    }
}
