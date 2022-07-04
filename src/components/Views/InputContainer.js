import classes from "./InputContainer.module.css";

const InputContainer = (props) => {
  const classNames = `${classes["input-container"]} ${props.classNames}`;
  const errorClassNames = `${classes.error} ${
    props.withError ? "" : classes.hidden
  }`;

  return (
    <div className={classNames}>
      <div className={classes["label-container"]}>
        <div className={classes.label}>{props.label}</div>
        <div className={errorClassNames}>{props.errorMessage}</div>
      </div>
      {props.children}
    </div>
  );
};

export default InputContainer;
