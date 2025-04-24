import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import router from "./app/router";
import { ModuleRegistry } from "ag-grid-community";
import {
  ClientSideRowModelModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  CustomFilterModule,
  ValidationModule,
  PaginationModule,
  ColumnAutoSizeModule,
  RowAutoHeightModule,
  TextEditorModule,
  CellStyleModule,
} from "ag-grid-community";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  CustomFilterModule,
  ValidationModule,
  PaginationModule,
  ColumnAutoSizeModule,
  RowAutoHeightModule,
  TextEditorModule,
  CellStyleModule,
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
