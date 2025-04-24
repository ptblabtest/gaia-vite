import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { AuthLayout, LoginLayout, EntityLayout } from "@/app/layouts";
import { LoginPage } from "@/app/pages/auth";
import {
  SalesPage,
  OperationsPage,
  ContactsPage,
  ReceivablesPage,
  PayablesPage,
  TemplatesPage,
  UsersPage,
  DashboardPage,
} from "@/app/pages/dashboard";
import { EntityPage, FormPage, ShowPage } from "@/app/pages/entity";
import { HomePage } from "@/app/pages/guest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "auth",
        element: <LoginLayout />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
            index: true,
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
          {
            path: "/sales",
            element: <SalesPage />,
          },
          {
            path: "/operations",
            element: <OperationsPage />,
          },
          {
            path: "/contacts",
            element: <ContactsPage />,
          },
          {
            path: "/receivables",
            element: <ReceivablesPage />,
          },
          {
            path: "/payables",
            element: <PayablesPage />,
          },
          {
            path: "/templates",
            element: <TemplatesPage />,
          },
          {
            path: "/users",
            element: <UsersPage />,
          },
          {
            path: ":entity",
            element: <EntityLayout />,
            children: [
              {
                path: ":id",
                element: <ShowPage />,
              },
              {
                path: "create",
                element: <FormPage />,
              },
              {
                path: "edit/:id",
                element: <FormPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);

export default router;
