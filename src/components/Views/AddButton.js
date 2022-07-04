import classes from "./AddButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const AddButton = (props) => {
  const classNames = `${classes.add} ${props.className}`;

  return (
    <button className={classNames} onClick={props.onClickHandler}>
      <FontAwesomeIcon icon={faPlusCircle} />
    </button>
  );
};

export default AddButton;
