import Modal from "../Views/Modal";
import classes from "./Alert.module.css";

const Alert = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <h1 className={classes.content}>Warning!</h1>
      <h3 className={classes.content}>
        Importing a backup file will REMOVE and REPLACE all saved accounts and
        assignments.
      </h3>
      <h3 className={classes.content}>Do you want to proceed?</h3>

      <div className={classes["button-container"]}>
        <button
          onClick={props.onClose}
          className={`${classes.button} ${classes.cancel}`}
        >
          <h2>Cancel</h2>
        </button>
        <div className={classes.spacer}></div>
        <button
          onClick={props.onImport}
          className={`${classes.button} ${classes.proceed}`}
        >
          <h2>Proceed</h2>
        </button>
      </div>
    </Modal>
  );
};

export default Alert;
