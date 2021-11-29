import CloudCircleOutlinedIcon from "@mui/icons-material/CloudCircleOutlined";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import GradingIcon from "@mui/icons-material/Grading";

const configs = [
  [
    {
      key: 0,
      label: "Enroll",
      icon: <AssignmentIndIcon />,
      to: ({ pathname }) => `${pathname}/enroll`,
    },
    {
      key: 1,
      label: "Grade",
      icon: <GradingIcon />,
      to: ({ pathname }) => `${pathname}/grade`,
    },
    {
      key: 2,
      label: "Drive",
      icon: <CloudCircleOutlinedIcon />,
      to: ({ pathname }) => `${pathname}/drive`,
    },
  ],
];

const drawerWidth = 240;

export { configs, drawerWidth };
