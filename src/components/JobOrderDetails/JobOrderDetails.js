import FloatingForm from "./floatingForm/FloatingForm";
import JobOrderDetailCell from "./JobOrderDetailCell";
import JobOrderDetailAssignmentContainer from "./JobOrderDetailAssignmentContainer";
import classes from "./JobOrderDetails.module.css";
import React, { useState } from "react";

const JobOrderDetails = (props) => {
  const [selectedAssignment, setSelectedAssignment] = useState({});
  const [originalAssignment, setOriginalAssignment] = useState({});
  const [allowSave, setAllowSave] = useState(false);

  const sortedAssignments = props.account.assignments.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const containsIncompletedAssignment = sortedAssignments.some((assignment) => {
    return assignment.status.toLowerCase() != "inspected";
  });

  const containsAssignment = sortedAssignments.some((assignment) => {
    return assignment.id === selectedAssignment.id;
  });

  if (
    containsAssignment === false &&
    Object.keys(selectedAssignment).length != 0
  ) {
    setSelectedAssignment({});
    setOriginalAssignment({});
    setAllowSave(false);
  }

  const updateStatusHandler = (status) => {
    if (
      status.toLowerCase() === originalAssignment.status.toLowerCase() &&
      selectedAssignment.findings === originalAssignment.findings &&
      selectedAssignment.dateCompleted === originalAssignment.dateCompleted
    ) {
      setSelectedAssignment((prevStatus) => {
        return {
          ...prevStatus,
          status: originalAssignment.status,
          dateModified: originalAssignment.dateModified,
        };
      });

      setAllowSave(false);
      return;
    }

    setSelectedAssignment((prevStatus) => {
      return { ...prevStatus, status: status, dateModified: new Date() };
    });

    setAllowSave(true);
  };

  const updateFindingsHandler = (findings) => {
    if (
      findings === originalAssignment.findings &&
      originalAssignment.status.toLowerCase() ===
        originalAssignment.status.toLowerCase() &&
      selectedAssignment.dateCompleted === originalAssignment.dateCompleted
    ) {
      setSelectedAssignment((prevStatus) => {
        return {
          ...prevStatus,
          findings: originalAssignment.findings,
          dateModified: originalAssignment.dateModified,
        };
      });

      setAllowSave(false);
      return;
    }

    setSelectedAssignment((prevStatus) => {
      return { ...prevStatus, findings: findings, dateModified: new Date() };
    });

    setAllowSave(true);
  };

  const updateDateCompletedHandler = (dateCompleted) => {
    if (
      originalAssignment.dateCompleted === undefined &&
      dateCompleted === ""
    ) {
      dateCompleted = undefined;
    }

    if (
      selectedAssignment.findings === originalAssignment.findings &&
      selectedAssignment.status.toLowerCase() ===
        originalAssignment.status.toLowerCase() &&
      dateCompleted === originalAssignment.dateCompleted
    ) {
      setSelectedAssignment((prevStatus) => {
        return {
          ...prevStatus,
          dateCompleted: originalAssignment.dateCompleted,
          dateModified: originalAssignment.dateModified,
        };
      });

      setAllowSave(false);
      return;
    }

    setSelectedAssignment((prevStatus) => {
      return {
        ...prevStatus,
        dateCompleted: dateCompleted,
        dateModified: new Date(),
      };
    });

    setAllowSave(true);
  };

  const updateHandler = () => {
    let newAssignments = props.account.assignments.map((assignment) => {
      if (assignment.id === selectedAssignment.id) {
        return selectedAssignment;
      }

      return assignment;
    });

    let account = props.account;
    account.assignments = newAssignments;

    props.updateHandler(account);

    setSelectedAssignment(selectedAssignment);
    setOriginalAssignment(selectedAssignment);

    setAllowSave(false);
  };

  const selectedAssignmentView = Object.keys(selectedAssignment).length > 0 &&
    containsAssignment && (
      <div>
        <div className={classes["section-header"]}>Selected Job Order</div>
        <JobOrderDetailAssignmentContainer
          assignment={selectedAssignment}
          updateStatus={updateStatusHandler}
          updateFindings={updateFindingsHandler}
          updateCompletedDate={updateDateCompletedHandler}
          updateHandler={updateHandler}
          allowSave={allowSave}
        />
      </div>
    );

  const selectAssignmentHandler = (assignment) => {
    setSelectedAssignment(assignment);
    setOriginalAssignment(assignment);
  };

  const addAssignmentHandler = (assignment) => {
    let account = props.account;
    account.assignments = [...account.assignments, assignment];
    props.updateHandler(account);
  };

  React.useEffect(() => {
    if (containsAssignment === false) {
      setSelectedAssignment({});
      setOriginalAssignment({});
      setAllowSave(false);
    }
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.form}>
        <div className={classes["account-container"]}>
          <div className={classes["section-header"]}>Account</div>
          <JobOrderDetailCell
            category="NAME"
            value={props.account.customer}
            inputContainer="fixed"
          />

          <JobOrderDetailCell
            category="ACCOUNT NUMBER"
            value={props.account.accountNumber}
            inputContainer="fixed"
          />
        </div>

        {selectedAssignmentView}
      </div>

      <FloatingForm
        assignments={sortedAssignments}
        selectAssignmentHandler={selectAssignmentHandler}
        selectedAssignment={selectedAssignment}
        disabled={containsIncompletedAssignment}
        isNewAccount={false}
        addHandling={addAssignmentHandler}
      />
    </div>
  );
};

export default JobOrderDetails;
