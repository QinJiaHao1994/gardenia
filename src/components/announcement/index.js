import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const Announcement = () => {
  return (
    <Paper
      sx={{
        p: 2,
        mb: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography component="p" variant="h6" color="inherit" noWrap>
        Announcement
      </Typography>
      <Typography component="div" variant="subtitle1" color="inherit">
        For the best user experience Google Chrome is the recommended browser
        for viewing Gardenia.
      </Typography>
    </Paper>
  );
};

export default Announcement;
