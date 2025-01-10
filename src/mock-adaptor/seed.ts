const projects = [
  {
    id: "1",
    name: "Project A",
    description: "This is the description of Project A",
    startDate: "2025-01-10T00:00:00Z",
    endDate: "2025-06-01T00:00:00Z",
    projectManager: "Alice",
  },
  {
    id: "2",
    name: "Project B",
    description: "This is the description of Project B",
    startDate: "2025-02-15T00:00:00Z",
    endDate: "2025-07-01T00:00:00Z",
    projectManager: "Bob",
  },
  {
    id: "3",
    name: "Project C",
    description: "This is the description of Project C",
    startDate: "2025-03-10T00:00:00Z",
    endDate: "2025-08-20T00:00:00Z",
    projectManager: "Charlie",
  },
  {
    id: "4",
    name: "Project D",
    description: "This is the description of Project D",
    startDate: "2025-04-01T00:00:00Z",
    endDate: "2025-09-01T00:00:00Z",
    projectManager: "Alice",
  },
  {
    id: "5",
    name: "Project E",
    description: "This is the description of Project E",
    startDate: "2025-05-05T00:00:00Z",
    endDate: "2025-10-15T00:00:00Z",
    projectManager: "David",
  },
  {
    id: "6",
    name: "Project F",
    description: "This is the description of Project F",
    startDate: "2025-06-10T00:00:00Z",
    endDate: "2025-11-01T00:00:00Z",
    projectManager: "Eve",
  },
];

const favProjectIds = ["1", "2"];

export const seedDB = () => {
  if (!localStorage.getItem("projects")) {
    localStorage.setItem("projects", JSON.stringify(projects));
  }
  if (!localStorage.getItem("favProjectIds")) {
    localStorage.setItem("favProjectIds", JSON.stringify(favProjectIds));
  }
};
