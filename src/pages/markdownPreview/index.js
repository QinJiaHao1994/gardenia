import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { getMarkdownFileDownloadUrlBelongToCourse } from "../../store/drive/driveApi";
import { withNotify } from "../../common/hocs";
import { useRequest } from "../../common/hooks";
import { selectUser } from "../../store/user/userSlice";

const MarkdownPreview = ({ updateNotify }) => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { mdId } = useParams();
  const [value, setValue] = useState("");
  const [request, response] = useRequest(
    getMarkdownFileDownloadUrlBelongToCourse
  );

  useEffect(() => {
    if (!user) return;
    const func = async () => {
      try {
        const url = await request(user, mdId);
        const xhr = new XMLHttpRequest();

        xhr.responseType = "type";
        xhr.onload = () => setValue(xhr.response);
        xhr.open("GET", url);
        xhr.send();
      } catch (err) {}
    };
    func();
  }, [user, mdId, request]);

  useEffect(() => {
    const { error, status } = response;
    if (status !== "failed") return;

    updateNotify({
      open: true,
      onClose: () => navigate("/"),
      type: false,
      text: error,
    });
  }, [response, updateNotify, navigate]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
        flexGrow: 1,
      }}
    >
      <Paper elevation={3} sx={{ p: 3, flexGrow: 1 }}>
        <MDEditor.Markdown source={value} />
      </Paper>
    </Container>
  );
};

export default withNotify(MarkdownPreview);
