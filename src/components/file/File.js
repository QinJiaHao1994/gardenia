import { forwardRef } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { withClickAwayWhenSelected } from "../../common/hocs";

const File = forwardRef(
  ({ data, type, isSelect, onClick, onDoubleClick, onContextMenu }, ref) => {
    return (
      <Paper
        ref={ref}
        onContextMenu={(e) => onContextMenu(e, data)}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 200,
          height: 200,
          cursor: "pointer",
          userSelect: "none",
          margin: 1,
          flexShrink: 0,
        }}
        variant="outlined"
        component="li"
        onClick={() => onClick(data)}
        onDoubleClick={() => onDoubleClick(data)}
      >
        <Box
          sx={{
            flexGrow: 1,
            p: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PictureAsPdfIcon sx={{ fontSize: 80, color: "#d85040" }} />
        </Box>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          sx={{ p: 1, bgcolor: isSelect ? "#e8f0fe" : "inherits" }}
        >
          <PictureAsPdfIcon sx={{ fontSize: 24, color: "#d85040" }} />
          <Tooltip title={data.name} enterDelay={500}>
            <Typography variant="caption" component="span" noWrap>
              {data.name}
            </Typography>
          </Tooltip>
        </Stack>
      </Paper>
    );
  }
);

export default withClickAwayWhenSelected(File);
