import classes from "./ListView.module.css";
import JobOrderListings from "./JobOrderListings";
import JobOrderSearch from "./JobOrderSearch";

const ListView = (props) => {
  const selectHandler = (selectedAccountNumber) => {
    const account = props.accounts.filter((account) => {
      return account.accountNumber === selectedAccountNumber;
    })[0];

    props.selectHandling(account);
  };

  const addAccountHandler = () => {
    props.selectHandling({});
  };

  return (
    <div className={classes["list-view"]}>
      <JobOrderSearch
        accounts={props.completeAccountList}
        searchHandling={props.searchHandler}
        modeFilterHandler={props.modeFilterHandler}
        modeFilter={props.modeFilter}
        addAccountHandling={addAccountHandler}
      />

      <JobOrderListings
        accounts={props.accounts}
        selectHandling={selectHandler}
        selectedAccountNumber={props.selectedAccountNumber}
      />
    </div>
  );
};

export default ListView;
