import React from "react";
import RenderInput from "@/config/RenderInput";
import RenderItem from "@/config/RenderItem";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Button from "@/components/Button";

const TableForm = ({
  form,
  data,
  onChange,
  onDeleteRow,
  onDuplicateRow,
  onAddRow,
  groupBy,
}) => {
  const gridStyle = {
    gridTemplateColumns:
      form
        .map((field) => {
          const width = field.width || 150;
          return `${width}px`;
        })
        .join(" ") + " 60px",
  };

  const hasActions = !!onDuplicateRow || !!onDeleteRow;

  const renderRow = (row, index) => (
    <div
      key={index}
      className="grid p-1 border-b items-center hover:bg-gray-50"
      style={gridStyle}
    >
      {form.map((field) => (
        <div key={field.item} className="px-1">
          {field.item === "order" ? (
            <RenderItem type="number" value={row.order} />
          ) : (
            <RenderInput
              field={{ ...field, id: field.item }}
              value={row[field.item]}
              onChange={(e) => onChange(index, field.item, e.target.value)}
              type={field.type || "text"}
              className="w-full h-8"
            />
          )}
        </div>
      ))}
      {hasActions && (
        <div className="flex justify-center gap-2 px-2 py-1">
          {onDuplicateRow && (
            <Button
              type="button"
              onClick={() => onDuplicateRow(index)}
              className="text-blue-600 hover:text-blue-800 bg-transparent p-1"
              title="Duplicate Row"
            >
              <ContentCopyIcon fontSize="small" />
            </Button>
          )}
          {onDeleteRow && (
            <Button
              type="button"
              onClick={() => onDeleteRow(index)}
              className="text-red-600 hover:text-red-800 bg-transparent p-1"
            >
              <DeleteIcon fontSize="small" />
            </Button>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Table */}
      <div className="inline-block min-w-full">
        <div className="relative">
          <div className="sticky top-0 z-10">
            <div
              className="grid bg-gray-100 border-b font-semibold items-center"
              style={gridStyle}
            >
              {form.map((field) => {
                const width = field.item === "order" ? 40 : field.width || 150;
                return (
                  <div key={field.item} style={{ width }} className="px-2 py-1">
                    {field.label}
                  </div>
                );
              })}
              {hasActions && (
                <div className="text-center px-2 py-1" style={{ width: 60 }}>
                  Actions
                </div>
              )}
            </div>
          </div>

          {/* Data rows */}
          <div className="space-y-1 overflow-y-auto max-h-[500px]">
            {groupBy
              ? [...groupBy.data]
                  .sort((a, b) => (a.order || 0) - (b.order || 0))
                  .map((group) => {
                    const groupedRows = data
                      .filter((row) => row[groupBy.key] === group.id)
                      .sort((a, b) => (a.order || 0) - (b.order || 0));
                    return (
                      <div key={group.id} className="border-b">
                        <div className="flex justify-between items-center px-3 py-2 bg-gray-50 font-semibold border-b">
                          {groupBy.header(group)}
                          {onAddRow && (
                            <Button
                              type="button"
                              onClick={() => onAddRow(group.id)}
                              className="px-2 py-1 text-sm bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
                            >
                              Add Row
                            </Button>
                          )}
                        </div>
                        <div className="space-y-1">
                          {groupedRows.length > 0 ? (
                            groupedRows.map((row) => {
                              const globalIndex = data.findIndex(
                                (d) => d === row
                              );
                              return renderRow(row, globalIndex);
                            })
                          ) : (
                            <div className="text-sm text-center text-gray-400 py-2">
                              No data for this group
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
              : [...data]
                  .sort((a, b) => (a.order || 0) - (b.order || 0))
                  .map((row, index) => renderRow(row, index))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TableForm;
