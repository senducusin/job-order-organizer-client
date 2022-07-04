import { useState } from "react";
import InputContainer from "../Views/InputContainer";
import FloatingForm from "./floatingForm/FloatingForm";
import classes from "./NewJobOrder.module.css";

const NewJobOrder = (props) => {
  const [assignments, setAssignments] = useState([]);
  const [customer, setCustomer] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [exist, setExist] = useState(false);

  const customerOnChangeHandler = (event) => {
    setCustomer(event.target.value);
  };

  const accountNumberOnChangeHandler = (event) => {
    setAccountNumber(event.target.value);

    if (exist) {
      setExist(false);
    }
  };

  const notesOnChangeHandler = (event) => {
    setNotes(event.target.value);
  };

  const addAssignmentHandler = (assignment) => {
    setAssignments((prevState) => {
      return [...prevState, assignment];
    });
  };

  const removeAssignmentHandler = (id) => {
    setAssignments((prevState) => {
      return prevState.filter((assignment) => {
        return assignment.id != id;
      });
    });
  };

  const updateAssignmentHandler = (assignmentToUpdate) => {
    setAssignments((prevState) => {
      let newAssignments = prevState.map((assignment) => {
        if (assignment.id === assignmentToUpdate.id) {
          return { ...assignmentToUpdate };
        } else {
          return assignment;
        }
      });

      return [...newAssignments];
    });
  };

  const validateAccount = (accountNumber) => {
    var doesExist = false;

    props.accounts.map((account) => {
      if (account.accountNumber === accountNumber) {
        doesExist = true;
      }
    });

    return doesExist;
  };

  const submitHandler = () => {
    if (validateAccount(accountNumber)) {
      setExist(true);
      return;
    }

    let newAccount = {
      customer: customer,
      accountNumber,
      accountNumber,
      assignments: assignments
        .filter((assignment) => {
          return assignment.assignment.length > 0 && assignment.date.length > 0;
        })
        .map((assignment) => {
          assignment.edit = false;
          return assignment;
        }),
    };

    setCustomer("");
    setAccountNumber("");
    setAssignments([]);

    props.addHandler(newAccount);
  };

  const validation = !(accountNumber.length > 0 && customer.length > 0);

  return (
    <div className={classes.container}>
      <div className={classes.form}>
        <InputContainer label="Customer">
          <input
            type="text"
            value={customer}
            onChange={customerOnChangeHandler}
          />
        </InputContainer>

        <InputContainer
          label="Account Number"
          errorMessage="Account number already exist"
          withError={exist}
        >
          <input
            type="text"
            value={accountNumber}
            onChange={accountNumberOnChangeHandler}
          />
        </InputContainer>
        <div className={classes.bottom}>
          <button
            className={classes.save}
            disabled={validation}
            onClick={submitHandler}
          >
            Submit
          </button>
        </div>
      </div>

      <FloatingForm
        removeHandling={removeAssignmentHandler}
        addHandling={addAssignmentHandler}
        updateAssignments={updateAssignmentHandler}
        assignments={assignments}
        isNewAccount={true}
      />
    </div>
  );
};

export default NewJobOrder;
