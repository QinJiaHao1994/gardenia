import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Files = ({
  title,
  Component,
  data,
  type,
  selectId,
  onClick,
  onDoubleClick,
  onClickAway,
}) => {
  if (!data.length) return null;

  return (
    <>
      <Typography variant="subtitle1" component="p">
        {title}
      </Typography>
      <Box
        component="ul"
        sx={{
          p: 0,
          listStyle: "none",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {data.map((file, index) => (
          <Component
            index={index}
            key={file.id}
            data={file}
            type={type}
            isSelect={file.id === selectId}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
            onClickAway={onClickAway}
          />
        ))}
      </Box>
    </>
  );
};

export default Files;
