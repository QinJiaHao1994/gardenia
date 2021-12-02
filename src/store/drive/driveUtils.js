const parsePath = (dict, path) => {
  if (!path || path.length === 0) return [];
  const last = path[path.length - 1];
  if (!last) return [];
  return dict[last.id].children;
};

const hasDuplicateName = (newName, { parentId, is_directory }, dict) => {
  const siblings = dict[parentId].children.filter(
    (sibling) => sibling.is_directory === is_directory
  );

  return siblings.findIndex((sibling) => sibling.name === newName) !== -1;
};

export { parsePath, hasDuplicateName };
