import Box from "@mui/material/Box";
import useFormControls from "./hook";
import { useEffect } from "react";

import { Provider } from "./formContext";

const Form = ({ form, initialValues, children, onSubmit, ...forwardProps }) => {
  const { props, validateForm, setValues } = useFormControls(form);

  useEffect(() => {
    if (!initialValues) return;
    setValues((value) => ({
      ...value,
      ...initialValues,
    }));
  }, [initialValues, setValues]);

  const handleSubmit = (e) => {
    onSubmit(e, validateForm);
  };

  return (
    <Provider value={props}>
      <Box onSubmit={handleSubmit} {...forwardProps}>
        {children}
      </Box>
    </Provider>
  );
};

export default Form;
