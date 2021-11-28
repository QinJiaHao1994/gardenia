const defaultFilters = [
  {
    label: "All",
    predict: () => true,
    hasDivider: true,
  },
  {
    label: "In progress",
    predict: (course) =>
      course.endDate >= Date.now() && course.startDate <= Date.now(),
  },
  {
    label: "Future",
    predict: (course) => course.startDate > Date.now(),
  },
  {
    label: "Past",
    predict: (course) => course.endDate < Date.now(),
    hasDivider: true,
  },
];

export const createFilters = (courses) => {
  const years = new Set();
  courses.forEach(({ year }) => years.add(year));
  const filters = [...years].sort().map((year) => ({
    label: `${year}-${year + 1}`,
    predict: (course) => course.year === year,
  }));

  return [...defaultFilters, ...filters];
};
