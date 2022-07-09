import classes from "./JobOrderDetailAssignmentContainer.module.css";
import JobOrderDetailCell from "./JobOrderDetailCell";

const JobOrderDetailAssignmentFixedContainer = (props) => {
  const language = "en-US";

  const status =
    props.assignment.status === "" || props.assignment.status === undefined
      ? "none"
      : props.assignment.status;

  const assignmentDate = new Date(props.assignment.date);

  const modifiedDate =
    props.assignment.dateModified === undefined
      ? assignmentDate
      : new Date(props.assignment.dateModified);

  const dateCompleted =
    props.assignment.dateCompleted && new Date(props.assignment.dateCompleted);

  const getStringCompleteDate = (date) => {
    if (date === undefined || date === "") {
      return "mm dd, yyyy";
    }

    const month = date.toLocaleString(language, {
      month: "long",
    });

    const year = date.getFullYear();
    const day = date.toLocaleString(language, {
      day: "2-digit",
    });

    return `${month} ${day}, ${year}`;
  };

  const getDateFormat = (date) => {
    if (date === undefined || date === "") {
      return "";
    }

    const year = date.getFullYear();
    const day = date.toLocaleString(language, {
      day: "2-digit",
    });
    const month = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);

    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <JobOrderDetailCell
        category="Assignment"
        value={props.assignment.assignment}
        inputContainer="fixed"
      />

      <div className={classes.container}>
        <JobOrderDetailCell
          category="job order date"
          value={getStringCompleteDate(assignmentDate)}
          inputContainer="fixed"
        />

        <div className={classes.spacer}></div>

        <JobOrderDetailCell
          category="Date Accomplished"
          value={getDateFormat(dateCompleted)}
          fixFieldValue={getStringCompleteDate(dateCompleted)}
          inputContainer="date"
          updateCompletedDate={props.updateCompletedDate}
        />
      </div>

      <JobOrderDetailCell
        category="status"
        value={status}
        inputContainer="multi-button"
        options={["None", "In-progress", "Inspected"]}
        updateStatus={props.updateStatus}
      />

      <JobOrderDetailCell
        category="findings"
        inputContainer="textArea"
        value={props.assignment.findings}
        updateFindings={props.updateFindings}
      />

      <div className={classes.bottom}>
        <button
          className={classes.save}
          disabled={!props.allowSave}
          onClick={props.updateHandler}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default JobOrderDetailAssignmentFixedContainer;
