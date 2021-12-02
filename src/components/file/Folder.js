import { forwardRef } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import FolderIcon from "@mui/icons-material/Folder";
import { withClickAwayWhenSelected } from "../../common/hocs";

const Folder = forwardRef(
  ({ data, index, isSelect, onClick, onDoubleClick }, ref) => {
    return (
      <Paper
        ref={ref}
        sx={{
          bgcolor: isSelect ? "#e8f0fe" : "inherits",
          p: 1,
          display: "flex",
          alignItems: "center",
          width: 200,
          cursor: "pointer",
          userSelect: "none",
          margin: 1,
        }}
        variant="outlined"
        component="li"
        data-type="Folder"
        data-index={index}
        onClick={() => onClick(data)}
        onDoubleClick={() => onDoubleClick(data)}
      >
        <FolderIcon sx={{ mr: 2 }} />
        <Tooltip title={data.name} enterDelay={500}>
          <Typography variant="caption" component="span" noWrap>
            {data.name}
          </Typography>
        </Tooltip>
      </Paper>
    );
  }
);

export default withClickAwayWhenSelected(Folder);
