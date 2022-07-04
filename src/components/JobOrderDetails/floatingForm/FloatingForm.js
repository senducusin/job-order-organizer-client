import { useEffect, useRef, useState } from "react";
import classes from "./FloatingForm.module.css";
import NewAssignment from "./NewAssignment";
import { v4 as uuidv4 } from "uuid";
import AssignmentCell from "./AssignmentCell";

const FloatingForm = (props) => {
  const noAssignments = (
    <div className={classes.header}>No job order created</div>
  );
  const showAssignments = props.assignments.map((assignment) => {
    return (
      <AssignmentCell
        key={assignment.id}
        assignment={assignment}
        selectAssignmentHandler={props.selectAssignmentHandler}
        selectedAssignment={props.selectedAssignment}
        isNewAccount={props.isNewAccount}
        removeHandling={props.removeHandling}
      />
    );
  });

  const containerClasses = `${classes.container} ${
    props.assignments.length === 0 ? "" : classes.assignments
  }`;

  const topView =
    props.disabled === true ? (
      <div className={classes.warning}>There is an on-going job order</div>
    ) : (
      <NewAssignment
        id={uuidv4()}
        updateAssignments={props.updateAssignments}
        addAssignment={props.addHandling}
        disabled={props.disabled}
        isNewAccount={props.isNewAccount}
      />
    );

  return (
    <div className={classes.outer}>
      {topView}
      <div className={containerClasses}>
        <div className={classes.inner}>
          {props.assignments.length === 0 ? noAssignments : showAssignments}
        </div>
      </div>
    </div>
  );
};

export default FloatingForm;
