import classes from "./FilterModes.module.css";

const FilterModes = (props) => {
  const showAllButtonDisabled = props.modeFilter === "all";
  const inProgressButtonDisabled = props.modeFilter === "in-progress";
  const inspectedButtonDisabled = props.modeFilter === "inspected";

  const modeChanged = (event) => {
    props.modeFilterHandler(event.target.value);
  };

  return (
    <div className={classes.container}>
      <button
        className={classes["button-all"]}
        disabled={showAllButtonDisabled}
        value="all"
        onClick={modeChanged}
      >
        Show All
      </button>
      <div className={classes.spacer}></div>
      <button
        className={classes["button-in-progress"]}
        disabled={inProgressButtonDisabled}
        value="in-progress"
        onClick={modeChanged}
      >
        In-progress
      </button>
      <div className={classes.spacer}></div>
      <button
        className={classes["button-inspected"]}
        disabled={inspectedButtonDisabled}
        value="inspected"
        onClick={modeChanged}
      >
        Inspected
      </button>
    </div>
  );
};

export default FilterModes;
