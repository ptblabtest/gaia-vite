export const userConfig = {
  title: "Users",
  apiEndpoint: "users",
  baseRoute: "users",
  model: "User",
  columns: [
    { item: 'id', label: 'ID', type: 'text' },
    { item: 'name', label: 'Name', type: 'text' },
    { item: 'email', label: 'Email', type: 'email' },
    { item: 'role', label: 'Role', type: 'text' },
    { item: 'createdAt', label: 'Created Date', type: 'text' },
  ],
  card: [
    { item: 'id', label: 'ID', type: 'text' },
    { item: 'name', label: 'Name', type: 'text' },
    { item: 'email', label: 'Email', type: 'email' },
    { item: 'role', label: 'Role', type: 'text' },
  ],
  form: [
    { item: 'name', label: 'Name', type: 'text' },
    { item: 'email', label: 'Email', type: 'email' },
  ],
};
