export const expenseConfig = {
  title: "Expenses",
  apiEndpoint: "expenses",
  baseRoute: "expenses",
  model: "Expense",
  columns: [
    { item: "regNumber", label: "Expense Number", type: "text" },
    { item: "date", label: "Date", type: "date" },
    { item: "categoryName", label: "Category", type: "text" },
    { item: "description", label: "Description", type: "text" },
    { item: "amount", label: "Amount", type: "currency" },
  ],
  card: [
    { item: "regNumber", label: "Expense Number", type: "text" },
    { item: "description", label: "Description", type: "text" },
    { item: "amount", label: "Amount", type: "currency" },
    { item: "date", label: "Date", type: "date" },
  ],
  form: [
    { item: "categoryId", label: "Category", type: "select", width :250 },
    { item: "description", label: "Description", type: "textarea", width: 300 },
    { item: "amount", label: "Amount", type: "currency", width: 225 },
    { item: "date", label: "Date", type: "date", width : 200 },
  ],
};
