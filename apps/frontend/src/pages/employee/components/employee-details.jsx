import { Fragment } from "react";
import { FullWidth } from "./full-width";
import { format } from "date-fns";
import { Divider } from "@mui/material";
import { LineItem } from "./line-item";

export const EmployeeDetails = ({ state, dispatch }) => {
    return (
        <Fragment>
            <FullWidth>
                <Divider sx={{ backgroundColor: "#A2A2A2", mt: "30px" }} />
            </FullWidth>
            <LineItem
                label="What's your name?"
                name="name"
                answer={state.employee.name}
                edit={state.edit}
                state={state}
                dispatch={dispatch}
            />
            <LineItem
                label="What's your e-mail?"
                name="email"
                answer={state.employee.email}
                edit={state.edit}
                state={state}
                dispatch={dispatch}
            />
            <LineItem
                label="What's your ID number?"
                name="idNumber"
                answer={state.employee.idNumber}
                edit={state.edit}
                state={state}
                dispatch={dispatch}
            />
            <LineItem
                label="What's your age?"
                name="age"
                answer={state.employee.age}
                edit={state.edit}
                state={state}
                dispatch={dispatch}
            />
            <LineItem
                label="What's your gender?"
                name="gender"
                answer={state.employee.gender}
                state={state}
                edit={state.edit}
                dispatch={dispatch}
            />
            {state.employee.questionnaire.map((question, index) =>
                [0, 1].includes(index) ? (
                    <LineItem
                        label={question.content}
                        id={question.id}
                        key={`lineItem${index}`}
                        edit={state.edit}
                        state={state}
                        dispatch={dispatch}
                        answer={format(new Date(question.response), "hh:mmaaa")}
                    />
                ) : (
                    <LineItem
                        label={question.content}
                        id={question.id}
                        key={`lineItem${index}`}
                        edit={state.edit}
                        state={state}
                        dispatch={dispatch}
                        answer={question.response}
                    />
                )
            )}
        </Fragment>
    );
};
