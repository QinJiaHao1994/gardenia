import Box from "@mui/material/Box";
import useFormControls from "./hook";
import { useEffect } from "react";

import { Provider } from "./formContext";

const Form = ({ form, initialValues, children, onSubmit, ...forwardProps }) => {
  const { props, validateForm, setValues, modified } = useFormControls(form);

  useEffect(() => {
    if (!initialValues) return;
    setValues((value) => ({
      ...value,
      ...initialValues,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    onSubmit(e, validateForm, modified);
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
