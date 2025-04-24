export const stageTypeConfig = {
  title: "StageTypes",
  apiEndpoint: "stagetypes",
  baseRoute: "stagetypes",
  model: "StageType",
  columns: [],
  card: [],
  form: [
    { item: "key", label: "Key", type: "text" },
    { item: "order", label: "Order", type: "number" },
    { item: "value", label: "Value", type: "text" },
    { item: "label", label: "Label", type: "text" },
  ],
};
