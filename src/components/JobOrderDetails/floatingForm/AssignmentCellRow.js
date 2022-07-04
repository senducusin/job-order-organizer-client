import classes from "./AssignmentCellRow.module.css";

const AssignmentCellRow = (props) => {
  const valueView =
    props.isNewAccount === false && props.warning === true ? (
      <div className={classes["value-error"]}>{props.value}</div>
    ) : (
      <div className={classes.value}>{props.value}</div>
    );

  return (
    <div className={classes.container}>
      <div className={classes.category}>{props.category}:</div>
      {valueView}
    </div>
  );
};

export default AssignmentCellRow;
