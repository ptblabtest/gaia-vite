export const projectConfig = {
  title: "Projects",
  apiEndpoint: "projects",
  baseRoute: "projects",
  model: "Project",
  columns: [
    { item: "regNumber", label: "Project Number", type: "text" },
    { item: "contractTitle", label: "Contract Title", type: "text" },
    { item: "clientName", label: "Customer Name", type: "text" },
    { item: "productName", label: "Solution", type: "text" },
    { item: "budgetAmount", label: "Budget Amount", type: "currency" },
    { item: "progress", label: "Progress", type: "number" },
  ],
  card: [
    { label: "Project Details" },
    { item: "regNumber", label: "Project Number", type: "text" },
    { item: "contractTitle", label: "Contract Title", type: "text" },
    { item: "clientName", label: "Customer Name", type: "text" },
    { item: "picName", label: "Customer PIC Name", type: "text" },
    { item: "productName", label: "Solution", type: "text" },
  ],
  form: [
    { item: "regNumber", label: "Project Number", type: "toggle" },
    { item: "contractId", label: "Contract Number", type: "select" },
    { item: "assigneeId", label: "Assignee", type: "select" },
  ],
};
