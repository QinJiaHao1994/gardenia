const parseFiles = (files) => {
  const dict = new Map();
  files.forEach((file) => {
    dict.set(file.id, file);
  });

  files.forEach((file) => {
    if (file.id === "0") return;
    const parent = dict.get(file.parentId);
    if (!parent.children) parent.children = [];
    parent.children.push(file);
  });

  return dict;
};

export default parseFiles;
