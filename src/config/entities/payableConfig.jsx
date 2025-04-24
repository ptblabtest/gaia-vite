export const payableConfig = {
  title: "Payables",
  apiEndpoint: "payables",
  baseRoute: "payables",
  model: "Payable",
  columns: [{ item: "regNumber", label: "AP Number", type: "text" }],
  card: [{ item: "regNumber", label: "AP Number", type: "text" }],
  form: [
    { item: "regNumber", label: "AP Number", type: "toggle" },
    { item: "budgetId", label: "Budget Number", type: "select" },
    { item: "assigneeId", label: "Assignee", type: "select" },
  ],
};
