import { useEffect } from "react";

const useTitle = (title, defaultTitle = "Gardenia") => {
  useEffect(() => {
    document.title = title || defaultTitle;
  }, [title, defaultTitle]);
};

export default useTitle;
