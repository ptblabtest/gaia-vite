import React, { useEffect, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import useMutateUrl from "@/hooks/mutations";
import { useEntity } from "@/hooks/useEntity";
import TableForm from "@/components/forms/TableForm";
import RenderInput from "@/config/RenderInput";
import RenderItem from "@/config/RenderItem";
import Button from "@/components/Button";
import Label from "@/components/Label";
import SectionTitle from "@/components/SectionTitle";

const parentFields = [
  { item: "budgetId", label: "Budget", type: "select" },
  { item: "regNumber", label: "FPDP Number", type: "toggle" },
  { item: "description", label: "Description", type: "textarea" },
  { item: "requestDate", label: "Request Date", type: "date" },
  { item: "assigneeId", label: "Assignee", type: "select" },
];

const itemFields = [
  { item: "categoryId", label: "Category", type: "select", width: 300 },
  { item: "description", label: "Description", width: 600 },
  { item: "quantity", label: "Qty", type: "number", width: 70 },
  { item: "timeUnit", label: "Time Unit", type: "number", width: 70 },
  { item: "unitPrice", label: "Unit Price", type: "currency", width: 230 },
  { item: "amount", label: "Amount", type: "currency", width: 230 },
];

const FundForm = () => {
  const [searchParams] = useSearchParams();

  const { id } = useParams();
  const { initialData } = useEntity("funds", id, { mode: "form" });

  const budgetId = searchParams.get("budgetId") || initialData?.budgetId;
  const { create, update } = useMutateUrl("funds");

  const { initialData: budgetData } = useEntity("budgets", budgetId, {
    mode: "form",
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...(initialData || {}),
      budgetId,
      items:
        initialData?.items?.length > 0
          ? initialData.items
          : budgetData?.items?.map((item) => ({
              categoryId: item.categoryId || "",
              description: item.description || "",
              quantity: item.quantity || "",
              timeUnit: item.timeUnit || "",
              unitPrice: item.unitPrice || "",
              amount: item.amount || "",
            })) || [],
    },
    onSubmit: async (values) => {
      const itemKeys = itemFields.map((f) => f.item);
      const payload = {
        ...values,
        items: values.items
          .filter((item) => parseFloat(item.amount) > 0)
          .map((item) => {
            const sanitized = {};
            itemKeys.forEach((key) => {
              if (key in item) sanitized[key] = item[key];
            });
            if (item.id) sanitized.id = item.id;
            return sanitized;
          }),
      };
      
      let result;

      if (!values.id) {
        result = await create.mutateAsync(payload);
      } else {
        result = await update.mutateAsync({ id: values.id, item: payload });
      }

      const newId = values.id || result?.id;
      window.location.href = `/funds/${newId}`;

    },
  });

  const handleItemChange = (index, fieldId, value) => {
    const updated = [...formik.values.items];
    const row = { ...updated[index], [fieldId]: value };

    const quantity =
      parseFloat(fieldId === "quantity" ? value : row.quantity) || 0;
    const timeUnit =
      parseFloat(fieldId === "timeUnit" ? value : row.timeUnit) || 1;
    const unitPrice =
      parseFloat(fieldId === "unitPrice" ? value : row.unitPrice) || 0;

    row.amount = (quantity * timeUnit * unitPrice).toFixed(2);
    updated[index] = row;

    formik.setFieldValue("items", updated);
  };

  const handleItemDelete = (index) => {
    const updated = formik.values.items.filter((_, i) => i !== index);
    formik.setFieldValue("items", updated);
  };

  const handleAddRow = () => {
    const newRow = itemFields.reduce((acc, field) => {
      acc[field.item] = "";
      return acc;
    }, {});
    formik.setFieldValue("items", [...formik.values.items, newRow]);
  };

  const handleItemDuplicate = (index) => {
    const source = formik.values.items[index];
    const clone = JSON.parse(JSON.stringify(source));
    delete clone.id;

    const updated = [...formik.values.items];
    updated.splice(index + 1, 0, clone);
    formik.setFieldValue("items", updated);
  };

  const totals = useMemo(() => {
    return formik.values.items.reduce(
      (acc, row) => acc + (parseFloat(row.amount) || 0),
      0
    );
  }, [formik.values.items]);

  useEffect(() => {
    formik.setFieldValue("amount", totals);
  }, [totals]);

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div className="mb-1 border-b w-full text-left">
        <SectionTitle title="Fund Form" />
      </div>

      <div className="flex justify-between p-2 gap-2 border-b">
        {/* Left column: only budgetId */}
        <div className="flex flex-col gap-1 w-1/2">
          {["budgetId"].map((item) => {
            const field = parentFields.find((f) => f.item === item);
            return (
              <div key={item} className="flex items-center gap-2">
                <Label htmlFor={item} className="w-1/3 text-sm text-left">
                  {field.label}
                </Label>
                <RenderInput
                  field={{ ...field, id: item }}
                  value={formik.values[item]}
                  onChange={(e) => formik.setFieldValue(item, e.target.value)}
                  type={field.type || "text"}
                  className="w-2/3 text-sm px-2 py-1 border rounded"
                />
              </div>
            );
          })}
        </div>

        {/* Right column: rest of the parent fields */}
        <div className="flex flex-col gap-1 w-1/2 items-end">
          <div className="flex flex-col gap-1 w-full">
            {parentFields
              .filter((f) =>
                [
                  "regNumber",
                  "description",
                  "requestDate",
                  "assigneeId",
                ].includes(f.item)
              )
              .map((field) => (
                <div key={field.item} className="flex items-center gap-2">
                  <Label
                    htmlFor={field.item}
                    className="w-1/3 text-sm text-left"
                  >
                    {field.label}
                  </Label>
                  <RenderInput
                    field={{ ...field, id: field.item }}
                    value={formik.values[field.item]}
                    onChange={(e) =>
                      formik.setFieldValue(field.item, e.target.value)
                    }
                    type={field.type || "text"}
                    className="w-2/3 text-sm px-2 py-1 border rounded"
                  />
                </div>
              ))}
          </div>

          <Button
            type="button"
            onClick={handleAddRow}
            className="mt-2 px-3 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Row
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto border">
        <TableForm
          form={itemFields}
          data={formik.values.items}
          onChange={handleItemChange}
          onDeleteRow={handleItemDelete}
          onDuplicateRow={handleItemDuplicate}
        />
      </div>

      <div className="sticky bottom-0 z-20 bg-white border-t">
        <div className="flex justify-end w-full p-2">
          <div className="flex flex-col w-80 gap-2">
            <div className="flex justify-between items-center">
              <div className="text-md font-semibold">Total Amount:</div>
              <RenderItem
                type="currency"
                value={formik.values.amount}
                className="text-md font-semibold"
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={create.isPending || update.isPending}
                className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
              >
                {create.isPending || update.isPending
                  ? "Submitting..."
                  : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FundForm;
