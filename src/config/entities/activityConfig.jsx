export const activityConfig = {
  title: "Activities",
  apiEndpoint: "activities",
  baseRoute: "activities",
  model: "Activity",
  columns: [
    { item: "description", label: "Description", type: "text" },
    { item: "startDate", label: "Start Date", type: "date" },
  ],
  card: [
    { item: "description", label: "Description", type: "text" },
    { item: "startDate", label: "Start Date", type: "date" },
  ],
  form: [
    { item: "description", label: "Description", type: "textarea" },
    { item: "startDate", label: "Start Date", type: "date" },
    { item: "endDate", label: "End Date", type: "date" },
  ],
};
