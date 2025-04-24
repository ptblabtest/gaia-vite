export const costTypeConfig = {
  title: "Cost Type",
  apiEndpoint: "cost-type",
  baseRoute: "cost-type",
  model: "CostType",
  columns: [
    { item: "name", label: "Category Name", type: "text" },
    { item: "accountName", label: "Account Name", type: "text" },
  ],
  card: [
    { item: "name", label: "Category Name", type: "text" },
    { item: "accountName", label: "Account Name", type: "text" },
  ],
  form: [
    { item: "name", label: "Category Name", type: "text" },
    { item: "accountId", label: "Account Number", type: "select" },
  ],
};
