import classes from "./JobOrderListingsCell.module.css";

const JobOrderListingsCell = (props) => {
  var containerClassNames = `${classes.cell}${
    props.isSelected ? " " + classes.selected : ""
  }`;

  var statusClassNames = classes.status;

  const onSelectHandler = () => {
    props.onSelectHandling(props.account.accountNumber);
  };

  let containsInProgress = props.account.assignments.some((assignment) => {
    return assignment.status.toLowerCase() !== "inspected";
  });

  const priorityStatus = () => {
    if (containsInProgress) {
      statusClassNames = classes["status-with-alert"];

      return "In-progress";
    }

    return "Inspected";
  };

  return (
    <li className={containerClassNames} onClick={onSelectHandler}>
      <h4 className={classes.title}>{props.account.customer}</h4>
      <div className={classes.container}>
        <div className={classes.subtitle}>{props.account.accountNumber}</div>
        <div className={classes.spacer}></div>
        <div
          className={
            containsInProgress ? classes["status-with-alert"] : classes.status
          }
        >
          {priorityStatus()}
        </div>
      </div>

      <div className={classes.border}></div>
    </li>
  );
};

export default JobOrderListingsCell;
