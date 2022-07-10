import { Fragment, useState } from "react";
import Alert from "./Alert";
import classes from "./SideMenu.module.css";

const SideMenu = (props) => {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    if (props.showAlert) {
      setCartIsShown(true);
    } else {
      props.import();
    }
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const importHandler = () => {
    props.import();
    setCartIsShown(false);
  };

  return (
    <Fragment>
      {props.showAlert && cartIsShown && (
        <Alert onClose={hideCartHandler} onImport={importHandler} />
      )}

      <div className={classes.sidemenu}>
        <div className={classes.container}>
          <button className={classes.import} onClick={showCartHandler}>
            Import
          </button>
          <button className={classes.export} onClick={props.export}>
            Export
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default SideMenu;
