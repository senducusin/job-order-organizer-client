import AddButton from "../Views/AddButton";
import FilterModes from "./FilterModes";
import classes from "./JobOrderSearch.module.css";

const JobOrderSearch = (props) => {
  const onChangeHandler = (event) => {
    const keyword = event.target.value.toLowerCase();

    // let result = props.accounts.filter((account) => {
    //   return (
    //     account.customer
    //       .toLowerCase()
    //       .includes(event.target.value.toLowerCase()) ||
    //     account.accountNumber
    //       .toLowerCase()
    //       .includes(event.target.value.toLowerCase())
    //   );
    // });

    props.searchHandling(keyword);
  };

  const onClickHandler = () => {
    props.addAccountHandling();
  };

  return (
    <div className={classes["job-order-search"]}>
      <div className={classes.container}>
        <h3 className={classes.header}>Accounts</h3>
        <AddButton onClickHandler={onClickHandler} />
      </div>

      <input
        className={classes["search-bar"]}
        type="text"
        placeholder="Search"
        onChange={onChangeHandler}
      ></input>

      <FilterModes
        modeFilterHandler={props.modeFilterHandler}
        modeFilter={props.modeFilter}
      />
    </div>
  );
};

export default JobOrderSearch;
