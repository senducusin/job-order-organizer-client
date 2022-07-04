import classes from "./CloseButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const CloseButton = (props) => {
  const classNames = `${classes.close} ${props.className}`;

  return (
    <button className={classNames} onClick={props.onClickHandler}>
      <FontAwesomeIcon icon={faX} />
    </button>
  );
};

export default CloseButton;
