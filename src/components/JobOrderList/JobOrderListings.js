import { v4 as uuidv4 } from "uuid";
import JobOrderListingsCell from "./JobOrderListingsCell";
import classes from "./JobOrderListings.module.css";

const JobOrderListings = (props) => {
  const onSelectHandler = (accountNumber) => {
    props.selectHandling(accountNumber);
  };

  const jobOrderList = props.accounts.map((sampleJobOrder) => {
    return (
      <JobOrderListingsCell
        key={uuidv4()}
        account={sampleJobOrder}
        onSelectHandling={onSelectHandler}
        isSelected={
          props.selectedAccountNumber === sampleJobOrder.accountNumber
        }
      />
    );
  });

  return (
    <div className={classes.listings}>
      <ul>{jobOrderList}</ul>
    </div>
  );
};

export default JobOrderListings;
