import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { getMarkdownFileDownloadUrlBelongToCourse } from "../../store/drive/driveApi";
import { withNotify } from "../../common/hocs";
import { useRequest } from "../../common/hooks";

const MarkdownPreview = ({ updateNotify }) => {
  const navigate = useNavigate();
  const { courseId, mdId } = useParams();
  const [value, setValue] = useState("");
  const [request, response] = useRequest(
    getMarkdownFileDownloadUrlBelongToCourse
  );

  useEffect(() => {
    const func = async () => {
      try {
        const url = await request(courseId, mdId);
        const xhr = new XMLHttpRequest();

        xhr.responseType = "type";
        xhr.onload = () => setValue(xhr.response);
        xhr.open("GET", url);
        xhr.send();
      } catch (err) {}
    };
    func();
  }, [courseId, mdId, request]);

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
    <div className="container">
      <MDEditor.Markdown source={value} />
    </div>
  );
};

export default withNotify(MarkdownPreview);
