import { useParams, Navigate, Outlet } from "react-router-dom";

const VALID_ENTITIES = [
  "activities",
  "funds",
  "budgets",
  "categories",
  "clients",
  "coaAccounts",
  "contracts",
  "events",
  "expenses",
  "files",
  "invoices",
  "leads",
  "milestones",
  "notes",
  "opportunities",
  "payments",
  "purchases",
  "products",
  "projects",
  "quotes",
  "receivables",
  "stages",
  "tasks",
  "users",
  "vendors",
  "taxDocuments",
];

const EntityLayout = () => {
  const { entity } = useParams();

  if (!VALID_ENTITIES.includes(entity)) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default EntityLayout;
