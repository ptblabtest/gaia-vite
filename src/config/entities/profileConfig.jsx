export const profileConfig = {
  title: "Profiles",
  apiEndpoint: "profiles",
  baseRoute: "profiles",
  model: "Profile",
  columns: [
    { item: "firstName", label: "First Name", type: "text" },
    { item: "lastName", label: "Last Name", type: "text" },
    { item: "department", label: "Department", type: "text" },
    { item: "position", label: "Position", type: "text" },
    { item: "joinDate", label: "Join Date", type: "date" },
  ],
  card: [
    { item: "firstName", label: "First Name", type: "text" },
    { item: "lastName", label: "Last Name", type: "text" },
    { item: "department", label: "Department", type: "text" },
    { item: "position", label: "Position", type: "text" },
    { item: "joinDate", label: "Join Date", type: "date" },
  ],
  form: [
    { item: "userId", label: "User Number", type: "select" },
    { item: "firstName", label: "First Name", type: "text" },
    { item: "lastName", label: "Last Name", type: "text" },
    { item: "department", label: "Department", type: "text" },
    { item: "position", label: "Position", type: "text" },
    { item: "joinDate", label: "Join Date", type: "date" },
  ],
};
