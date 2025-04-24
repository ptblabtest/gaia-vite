import React, { useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import RenderItem from "@/config/RenderItem";
import { Link } from "react-router-dom";

function Table({
  items,
  columns = [],
  isLoading = null,
  error = null,
  mutate = null,
  showUrl = null,
  updateUrl = null,
}) {
  const gridRef = useRef(null);

  const baseColumns = columns.map((column, index) => {
    const baseColumn = {
      field: column.item,
      headerName: column.label,
      filter: column.filter !== undefined ? column.filter : true,
      sortable: column.sortable !== undefined ? column.sortable : true,
      width: column.width,
      flex: column.width ? undefined : 1,
      cellStyle: { whiteSpace: "nowrap" },
    };

    const isFirst = index === 0 && showUrl;

    if (!column.valueFormatter && !column.cellRenderer) {
      baseColumn.cellRenderer = (params) => {
        if (isFirst) {
          const id = params.data?.id;
          const to = showUrl.replace(":id", id);
          return (
            <span
              onClick={() => (window.location.href = to)}
              className="font-semibold underline-offset-4 hover:underline cursor-pointer"
            >
              {params.value}
            </span>
          );
        }

        return React.createElement(RenderItem, {
          type: column.type,
          value: params.value,
          className: "",
        });
      };
    }

    return baseColumn;
  });

  // Optional Stage column
  const hasStageName = items?.some((item) => item?.stageName !== undefined);
  if (hasStageName) {
    baseColumns.push({
      field: "stageName",
      headerName: "Stage",
      filter: true,
      sortable: true,
      width: 140,
    });
  }

  // Optional Edit actions column
  if (updateUrl) {
    baseColumns.push({
      headerName: "Actions",
      field: "__actions",
      width: 80,
      flex: undefined,
      sortable: false,
      filter: false,
      cellRenderer: (params) => {
        const id = params.data?.id;
        const to = updateUrl.replace(":id", id);

        return (
          <button
            onClick={() => (window.location.href = to)}
            className="inline-flex items-center text-sm bg-gray-200 text-gray-800 px-2 py-1 rounded-md hover:bg-gray-300"
          >
            Edit
          </button>
        );
      },
    });
  }

  // Set default sort: order (asc) > createdAt (desc)
  const hasOrderColumn = columns.some((col) => col.item === "order");
  const hasCreatedAtColumn = columns.some((col) => col.item === "createdAt");

  if (hasOrderColumn) {
    const orderCol = baseColumns.find((col) => col.field === "order");
    if (orderCol) {
      orderCol.sort = "asc";
    }
  } else if (hasCreatedAtColumn) {
    const createdAtCol = baseColumns.find((col) => col.field === "createdAt");
    if (createdAtCol) {
      createdAtCol.sort = "desc";
    }
  }

  const columnDefs = baseColumns;

  const defaultColDef = {
    resizable: true,
    minWidth: 50,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    cellStyle: {
      display: "flex",
      whiteSpace: "nowrap",
    },
  };

  const onGridReady = useCallback((params) => {
    const columnApi = params.columnApi || params.api?.columnApi;
    if (!columnApi) return;

    const allColumnIds = [];
    columnApi.getAllColumns().forEach((column) => {
      allColumnIds.push(column.getColId());
    });

    allColumnIds.forEach((colId) => {
      const column = columnApi.getColumn(colId);
      const colDef = column.getColDef();

      if (!colDef.width && !colDef.suppressSizeToFit) {
        columnApi.autoSizeColumn(colId);
      }
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  return (
    <div className="ag-theme-alpine w-full h-full">
      <AgGridReact
        domLayout="autoHeight"
        ref={gridRef}
        rowData={items}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20, 50]}
        onGridReady={onGridReady}
        animateRows={true}
        enableCellTextSelection={true}
        context={mutate ? { mutate } : {}}
      />
    </div>
  );
}

export default Table;
