export const paymentConfig = {
  title: "Payments",
  apiEndpoint: "payments",
  baseRoute: "payments",
  model: "Payment",
  columns: [
    { item: "regNumber", label: "Payment Number", type: "text" },
    { item: "date", label: "Date", type: "date" },
    { item: "description", label: "Description", type: "text" },
    { item: "amount", label: "Amount", type: "currency" },
  ],
  card: [
    { item: "regNumber", label: "Payment Number", type: "text" },
    { item: "date", label: "Date", type: "date" },
    { item: "description", label: "Description", type: "text" },
    { item: "amount", label: "Amount", type: "currency" },
  ],
  form: [
    { item: "description", label: "Description", type: "textarea", width: 300 },
    { item: "amount", label: "Amount", type: "currency", width: 300 },
    { item: "date", label: "Date", type: "date" },
    { item: "type", label: "Type", type: "text" },
    { item: "tag", label: "Tag", type: "text" },
  ],
};
