const parsePath = (dict, path) => {
  if (!path || path.length === 0) return [];
  const last = path[path.length - 1];
  if (!last) return [];
  return dict[last.id].children;
};

const hasDuplicateName = (newName, data, dict) => {
  const set = generateSiblingsSet(data.isDirectory, dict[data.parentId]);
  return set.has(newName);
};

const generateSiblingsSet = (isDirectory, parent) => {
  const set = new Set();
  if (!parent.children) return set;
  parent.children.forEach((child) => {
    if (child.isDirectory === isDirectory) {
      set.add(child.name);
    }
  });
  return set;
};

const generateFileName = (name, parent, dict) => {
  const set = generateSiblingsSet(false, dict[parent.id]);
  const index = name.lastIndexOf(".");
  let count = 1;
  let prefix, suffix;
  if (index !== -1) {
    prefix = name.substr(0, index);
    suffix = name.substr(index + 1);
  }

  let filename = name;
  while (set.has(filename)) {
    if (index === -1) {
      filename = `${name}${count}`;
    } else {
      filename = `${prefix}${count}.${suffix}`;
    }
    count++;
  }
  return filename;
};

const parseFiles = (files) => {
  files = JSON.parse(JSON.stringify(files));
  if (!files) return {};

  const dict = { ...files };
  Object.values(files).forEach((file) => {
    if (file.id === "0") return;
    const parent = dict[file.parentId];
    if (!parent.children) parent.children = [];
    parent.children.push(file);
  });

  return dict;
};

export { parsePath, hasDuplicateName, parseFiles, generateFileName };
