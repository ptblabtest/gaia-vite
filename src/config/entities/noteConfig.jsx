export const noteConfig = {
  title: "Notes",
  apiEndpoint: "notes",
  baseRoute: "notes",
  model: "Note",
  columns: [{ item: "description", label: "Description", type: "text" }],
  card: [{ item: "description", label: "Description", type: "text" }],
  form: [{ item: "description", label: "Description", type: "textarea", rows: 5 }],
};
