import classes from "./JobOrderDetailCell.module.css";
import { v4 as uuidv4 } from "uuid";

const JobOrderDetailCell = (props) => {
  const multiButtonOnClickHandler = (event) => {
    props.updateStatus(event.target.value);
  };

  const textAreaOnChangeHandler = (event) => {
    props.updateFindings(event.target.value);
  };

  const dateOnChangeHandler = (event) => {
    props.updateCompletedDate(event.target.value);
  };

  const value = () => {
    switch (props.inputContainer) {
      case "fixed":
        return <div className={classes.value}>{`${props.value}`}</div>;
      case "textArea":
        return (
          <textarea
            className={classes.textArea}
            value={props.value}
            onChange={textAreaOnChangeHandler}
          />
        );
      case "date":
        return (
          <div className={classes.value}>
            {props.fixFieldValue}
            <input
              className={classes["date-picker"]}
              type="date"
              value={props.value}
              onChange={dateOnChangeHandler}
            />
          </div>
        );
      case "multi-button":
        return (
          <div className={classes.flex}>
            {props.options.map((option) => {
              const disabled =
                option.toLowerCase() === props.value.toLowerCase();

              const buttonClassName = `${classes.button} ${
                classes[`button-${option.toLowerCase()}`]
              }`;

              return (
                <button
                  key={uuidv4()}
                  className={buttonClassName}
                  disabled={disabled}
                  onClick={multiButtonOnClickHandler}
                  value={option}
                >
                  {option}
                </button>
              );
            })}
          </div>
        );
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.category}>{props.category}</div>
      {value()}
      <div className={classes.border}></div>
    </div>
  );
};

export default JobOrderDetailCell;
