import classes from "./NewAssignment.module.css";
import CloseButton from "../../Views/CloseButton";
import { useState } from "react";
import InputContainer from "../../Views/InputContainer";

const NewAssignment = (props) => {
  const [assignment, setAssignment] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("None");
  const [findings, setFindings] = useState("");

  const removeHandler = () => {
    props.onRemoveHandling(props.assignment.id);
  };

  const assigneeOnchangeHandler = (event) => {
    setAssignment(event.target.value);
  };

  const dateOnchangeHandler = (event) => {
    setDate(event.target.value);
  };

  const statusOnChangeHandler = (event) => {
    setStatus(event.target.value);
  };

  const findingsOnchangeHandler = (event) => {
    setFindings(event.target.value);
  };

  const addNewAssignmentHandler = () => {
    props.addAssignment({
      assignment: assignment,
      date: date,
      status: status,
      findings: findings,
      id: props.id,
      edit: false,
      dateModified: new Date(),
    });

    setAssignment("");
    setDate("");
    setStatus("");
    setFindings("");
  };

  const validation = assignment.length > 0 && date.length > 0;

  return (
    <div className={classes.container}>
      <div className={classes.top}>
        <div className={classes.spacer}></div>
        {/* <CloseButton onClickHandler={removeHandler} /> */}
      </div>

      <InputContainer label="Assignment">
        <input
          className={classes.input}
          type="text"
          value={assignment}
          onChange={assigneeOnchangeHandler}
          disabled={props.disabled}
        />
      </InputContainer>

      <InputContainer label="Date">
        <input
          className={classes.date}
          type="date"
          value={date}
          onChange={dateOnchangeHandler}
          disabled={props.disabled}
        />
      </InputContainer>

      <InputContainer label="Status">
        <select
          className={classes.select}
          value={status}
          onChange={statusOnChangeHandler}
          disabled={props.disabled}
        >
          <option>None</option>
          <option>In-progress</option>
          <option>Inspected</option>
        </select>
      </InputContainer>

      <InputContainer label="Findings">
        <textarea
          className={classes.input}
          value={findings}
          onChange={findingsOnchangeHandler}
          disabled={props.disabled}
        />
      </InputContainer>

      <button
        className={classes.button}
        disabled={!validation}
        onClick={addNewAssignmentHandler}
      >
        Create a new job order
      </button>
    </div>
  );
};

export default NewAssignment;
