import CloseButton from "../../Views/CloseButton";
import classes from "./AssignmentCell.module.css";
import AssignmentCellRow from "./AssignmentCellRow";

const AssignmentCell = (props) => {
  const language = "en-US";
  const date = new Date(props.assignment.date);
  const month = date.toLocaleString(language, {
    month: "long",
  });

  const year = date.getFullYear();
  const day = date.toLocaleString(language, {
    day: "2-digit",
  });

  const status =
    props.assignment.status.length > 0 ? props.assignment.status : "None";

  const onClickHandler = () => {
    if (props.isNewAccount) return;
    props.selectAssignmentHandler(props.assignment);
  };

  const containerClasses = () => {
    if (props.isNewAccount) {
      return classes["continer-non-hover"];
    } else {
      return `${classes.container} ${
        props.selectedAssignment.id === props.assignment.id && classes.selected
      }`;
    }
  };

  const statusClass = status.toLowerCase() != "inspected";

  const removeHandler = () => {
    props.removeHandling(props.assignment.id);
  };

  const closeButtonView = props.isNewAccount && (
    <CloseButton onClickHandler={removeHandler} />
  );

  return (
    <div
      onClick={onClickHandler}
      className={containerClasses()}
      key={props.assignment.id}
    >
      {closeButtonView}

      <AssignmentCellRow
        category="Assignment"
        value={props.assignment.assignment}
      />

      <AssignmentCellRow
        category="Status"
        value={status}
        warning={statusClass}
        isNewAccount={props.isNewAccount}
      />

      <AssignmentCellRow
        category="Job Order Date"
        value={`${month} ${day}, ${year}`}
      />
    </div>
  );
};

export default AssignmentCell;
