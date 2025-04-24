export const productConfig = {
  title: "Products",
  apiEndpoint: "products",
  baseRoute: "products",
  model: "Product",
  columns: [
    { item: "regNumber", label: "Solution Number", type: "text" },
    { item: "name", label: "Name", type: "text" },
    { item: "description", label: "Description", type: "text" },
  ],
  card: [
    { item: "regNumber", label: "Solution Number", type: "text" },
    { item: "name", label: "Name", type: "text" },
    { item: "description", label: "Description", type: "text" },
  ],
  form: [
    { item: "regNumber", label: "Solution Number", type: "toggle" },
    { item: "name", label: "Name", type: "text" },
    { item: "description", label: "Description", type: "textarea" },
  ],
};
