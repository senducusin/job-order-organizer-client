import JobOrderDetails from "./JobOrderDetails";
import NewJobOrder from "./NewJobOrder";

import classes from "./DetailView.module.css";

const DetailView = (props) => {
  return (
    <div className={classes.container}>
      {Object.keys(props.account).length > 0 ? (
        <JobOrderDetails
          account={props.account}
          updateHandler={props.updateHandler}
        />
      ) : (
        <NewJobOrder addHandler={props.addHandler} accounts={props.accounts} />
      )}
    </div>
  );
};

export default DetailView;
