import classes from "./NewAssignment.module.css";
import CloseButton from "../../Views/CloseButton";
import { useState } from "react";
import InputContainer from "../../Views/InputContainer";
import AssignmentInputSelector from "../../Views/AssignmentInputSelector";

const NewAssignment = (props) => {
  const defaultSelctorInputValue = { other: false, value: "" };
  const [assignment, setAssignment] = useState(defaultSelctorInputValue);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState(defaultSelctorInputValue);
  const [findings, setFindings] = useState("");

  const removeHandler = () => {
    props.onRemoveHandling(props.assignment.id);
  };

  const assignmentOnchangeHandler = (value) => {
    setAssignment(value);
  };

  const dateOnchangeHandler = (event) => {
    setDate(event.target.value);
  };

  const statusOnChangeHandler = (value) => {
    setStatus(value);
  };

  const findingsOnchangeHandler = (event) => {
    setFindings(event.target.value);
  };

  const addNewAssignmentHandler = () => {
    props.addAssignment({
      assignment: assignment.value,
      date: date,
      status: status.value,
      findings: findings,
      id: props.id,
      edit: false,
      dateModified: new Date(),
    });

    setAssignment(defaultSelctorInputValue);
    setDate("");
    setStatus(defaultSelctorInputValue);
    setFindings("");
  };

  const validate = (stringValue) => {
    if (
      (stringValue.startsWith("- Select ") && stringValue.endsWith(" -")) ||
      stringValue.length === 0
    ) {
      return false;
    }

    return true;
  };

  const validation =
    validate(assignment.value) && validate(status.value) && date.length > 0;

  return (
    <div className={classes.container}>
      <div className={classes.top}>
        <div className={classes.spacer}></div>
      </div>

      <AssignmentInputSelector
        label="Assignment"
        value={assignment}
        onChangeHandler={assignmentOnchangeHandler}
        disabled={props.disabled}
        options={[
          "Low Consumption",
          "Zero Consumption",
          "Stuck Meter",
          "No Display",
          "Illegally Reconnected",
          "Creeping Meter",
          "High Consumption",
          "Relocate Meter",
          "Check Meter",
          "Other",
        ]}
      />

      <InputContainer label="Date">
        <input
          className={classes.date}
          type="date"
          value={date}
          onChange={dateOnchangeHandler}
          disabled={props.disabled}
        />
      </InputContainer>

      <AssignmentInputSelector
        label="Status"
        value={status}
        onChangeHandler={statusOnChangeHandler}
        disabled={props.disabled}
        options={["None", "In-progress", "Inspected"]}
      />

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
