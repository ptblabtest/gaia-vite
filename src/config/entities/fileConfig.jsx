export const fileConfig = {
  title: "Files",
  apiEndpoint: "files",
  baseRoute: "files",
  model: "File",
  columns: [
    { item: "title", label: "Title", type: "text" },
    { item: "url", label: "Url", type: "text" },
    { item: "filename", label: "Filename", type: "text" },
    { item: "path", label: "Path", type: "text" },
    { item: "mimetype", label: "Mimetype", type: "text" },
    { item: "createdAt", label: "Created Date", type: "text" },
    { item: "updatedAt", label: "Modified Date", type: "text" },
  ],
  card: [
    { item: "title", label: "Title", type: "text" },
    { item: "url", label: "Url", type: "text" },
    { item: "filename", label: "Filename", type: "text" },
    { item: "path", label: "Path", type: "text" },
    { item: "mimetype", label: "Mimetype", type: "text" },
  ],
  form: [
    { item: "title", label: "Title", type: "text" },
    { item: "url", label: "Url", type: "text" },
  ],
};
