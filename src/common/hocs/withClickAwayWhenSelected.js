import ClickAwayListener from "@mui/material/ClickAwayListener";
import { getDisplayName } from "../utils";

const withClickAwayWhenSelected = (Component) => {
  const WrappedComponent = ({ onClickAway, ...props }) => {
    const { isSelect } = props;
    if (!isSelect) return <Component {...props} />;

    return (
      <ClickAwayListener onClickAway={onClickAway}>
        <Component {...props} />
      </ClickAwayListener>
    );
  };

  WrappedComponent.displayName = `withClickAwayWhenSelected(${getDisplayName(
    Component
  )})`;

  return WrappedComponent;
};

export default withClickAwayWhenSelected;
