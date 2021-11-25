import { createElement, useContext, memo } from "react";
import { formContext } from "./hook";

const MemoField = memo(({ component, ...props }) => {
  return createElement(component, { ...props });
});

const Field = ({ name, ...props }) => {
  const forwardProps = useContext(formContext)[name];
  return <MemoField {...props} {...forwardProps} />;
};

export default Field;
