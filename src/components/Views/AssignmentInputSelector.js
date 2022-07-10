import classes from "./AssignmentInputSelector.module.css";
import InputContainer from "./InputContainer";
import { v4 as uuidv4 } from "uuid";
import { useState, useRef } from "react";

const AssignmentInputSelector = (props) => {
  const options = [`- Select ${props.label} -`, ...props.options].map(
    (option) => <option key={uuidv4()}>{option}</option>
  );

  const selectOnChangeHandler = (event) => {
    if (event.target.value === "Other") {
      props.onChangeHandler({ ...props.value, other: true });
    } else {
      props.onChangeHandler({ other: false, value: event.target.value });
    }
  };

  const inputOnChangeHandler = (event) => {
    props.onChangeHandler({ ...props.value, value: event.target.value });
  };

  const selectValue = props.value.other ? "Other" : props.value.value;
  const inputValue = props.value.other ? props.value.value : "";

  return (
    <InputContainer label={props.label}>
      <select
        className={classes.select}
        value={selectValue}
        onChange={selectOnChangeHandler}
        disabled={props.disabled}
      >
        {options}
      </select>

      {props.value.other && (
        <input
          className={classes.input}
          type="text"
          placeholder={`Enter Custom ${props.label}`}
          onChange={inputOnChangeHandler}
          value={inputValue}
        />
      )}
    </InputContainer>
  );
};

export default AssignmentInputSelector;
