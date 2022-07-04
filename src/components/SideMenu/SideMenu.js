import classes from "./SideMenu.module.css";

const SideMenu = (props) => {
  return (
    <div className={classes.sidemenu}>
      {/* <div className={classes.spacer}></div> */}
      <div className={classes.container}>
        <button className={classes.import} onClick={props.import}>
          Import
        </button>
        <button className={classes.export} onClick={props.export}>
          Export
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
