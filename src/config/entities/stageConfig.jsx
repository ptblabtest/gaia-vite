export const stageConfig = {
  title: "Stages",
  apiEndpoint: "stages",
  baseRoute: "stages",
  model: "Stage",
  columns: [
    { item: "stageName", label: "Name", type: "text" },
    { item: "comment", label: "Comment", type: "text" },
    { item: "createdAt", label: "Created Date", type: "date" },
  ],
  card: [
    { item: "stageName", label: "Name", type: "text" },
    { item: "comment", label: "Comment", type: "text" },
  ],
  form: (model) => [
    {
      item: "stageCategoryId",
      label: "Name",
      type: "select",
      optionEndpoint: `/select/stageCategoryId?model=${model}`
    },
    { item: "comment", label: "Comment", type: "textarea" },
  ],
};
