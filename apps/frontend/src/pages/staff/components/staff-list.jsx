import { Container } from "@mui/material"
import { NewStaffMember } from "./new-staff-member"
import { StaffItem } from "./staff-item"

export const StaffList = ({ setOpen, state, dispatch }) => {
    return(
        <Container
            sx={{
                padding: "0 !important",
                display: "flex",
                gap: "15px",
                flexWrap: "wrap",
                justifyContent: "start"
            }}
        >
            {
                state.staffMembers.map((admin, index) => (
                    <StaffItem
                        setOpen={setOpen}
                        key={index}
                        state={state}
                        dispatch={dispatch}
                        data={admin}
                    />
                ))
            }
            <NewStaffMember/>
        </Container>
    )
}