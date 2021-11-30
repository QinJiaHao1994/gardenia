import CloudCircleOutlinedIcon from "@mui/icons-material/CloudCircleOutlined";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import GradingIcon from "@mui/icons-material/Grading";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const configs = [
  [
    {
      key: 0,
      label: "Detail",
      icon: <MenuBookIcon />,
      to: ({ courseId }) => `/course/${courseId}`,
    },
    {
      key: 1,
      label: "Enroll",
      icon: <AssignmentIndIcon />,
      to: ({ courseId }) => `/course/${courseId}/enroll`,
    },
    {
      key: 2,
      label: "Grade",
      icon: <GradingIcon />,
      to: ({ courseId }) => `/course/${courseId}/grade`,
    },
    {
      key: 3,
      label: "Drive",
      icon: <CloudCircleOutlinedIcon />,
      to: ({ courseId }) => `/course/${courseId}/drive`,
    },
  ],
];

const drawerWidth = 240;

export { configs, drawerWidth };
