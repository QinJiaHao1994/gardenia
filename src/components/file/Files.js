import Box from "@mui/material/Box";

const Files = ({
  Component,
  data,
  type,
  select,
  onClick,
  onDoubleClick,
  onClickAway,
  onContextMenu,
}) => {
  return (
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
      {data.map((file) => (
        <Component
          key={file.id}
          data={file}
          type={type}
          isSelect={file.id === select}
          onClick={onClick}
          onDoubleClick={onDoubleClick}
          onClickAway={onClickAway}
          onContextMenu={onContextMenu}
        />
      ))}
    </Box>
  );
};

export default Files;
