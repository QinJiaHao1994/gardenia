import Box from "@mui/material/Box";
import useFormControls, { Provider } from "./hook";

const Form = ({ form, children, onSubmit, ...forwardProps }) => {
  const { props, validateForm } = useFormControls(form);

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
