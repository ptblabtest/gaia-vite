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

const itemFields = [
  { item: "description", label: "Description", width: 300 },
  { item: "quantity", label: "Quantity", type: "number", width: 80 },
  { item: "unitPrice", label: "Unit Price", type: "currency", width: 200 },
  { item: "vatRate", label: "VAT %", type: "percent", width: 100 },
  { item: "amount", label: "Amount", type: "currency", width: 200 },
];

const PurchaseForm = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const { data: initialData } = useEntity("purchases", id, {
    mode: "form",
  });
  const model = searchParams.get("model") || initialData?.model;
  const modelId = searchParams.get("modelId") || initialData?.modelId;
  const { create, update } = useMutateUrl("purchases");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...(initialData || {}),
      model,
      modelId,
      items: initialData?.items || [],
    },
    onSubmit: async (values) => {
      const payload = {
        ...values,
        ...(id ? {} : { model, modelId }),
        items: values.items.map((item) => ({
          ...item,
          id: item.id || undefined,
        })),
      };

      if (id) {
        delete payload.model;
        delete payload.modelId;
      }

      let result;

      if (!values.id) {
        result = await create.mutateAsync(payload);
      } else {
        result = await update.mutateAsync({ id: values.id, item: payload });
      }

      const newId = values.id || result?.id;
      window.location.href = `/purchases/${newId}`;
    },
  });

  const handleItemChange = (index, fieldId, value) => {
    const updated = [...formik.values.items];
    const row = { ...updated[index], [fieldId]: value };

    const quantity = parseFloat(row.quantity) || 0;
    const unitPrice = parseFloat(row.unitPrice) || 0;
    const vatRate = parseFloat(row.vatRate) || 0;

    const base = quantity * unitPrice;
    const vat = (base * vatRate) / 100;
    row.amount = (base + vat).toFixed(2);

    updated[index] = row;
    formik.setFieldValue("items", updated);
  };

  const handleAddRow = () => {
    const emptyRow = itemFields.reduce((acc, f) => {
      acc[f.item] = "";
      return acc;
    }, {});
    formik.setFieldValue("items", [...formik.values.items, emptyRow]);
  };

  const handleItemDelete = (index) => {
    const updated = formik.values.items.filter((_, i) => i !== index);
    formik.setFieldValue("items", updated);
  };

  const handleItemDuplicate = (index) => {
    const clone = { ...formik.values.items[index] };
    delete clone.id;
    const updated = [...formik.values.items];
    updated.splice(index + 1, 0, clone);
    formik.setFieldValue("items", updated);
  };

  const subtotal = useMemo(() => {
    return formik.values.items.reduce(
      (acc, row) => acc + (parseFloat(row.amount) || 0),
      0
    );
  }, [formik.values.items]);

  const vatAmount = useMemo(() => {
    return formik.values.items.reduce((acc, row) => {
      const q = parseFloat(row.quantity) || 0;
      const p = parseFloat(row.unitPrice) || 0;
      const r = parseFloat(row.vatRate) || 0;
      return acc + ((q * p * r) / 100 || 0);
    }, 0);
  }, [formik.values.items]);

  const totalAmount = subtotal;

  useEffect(() => {
    formik.setFieldValue("amount", subtotal.toFixed(2));
    formik.setFieldValue("vatAmount", vatAmount.toFixed(2));
    formik.setFieldValue("totalAmount", totalAmount.toFixed(2));
  }, [subtotal, vatAmount, totalAmount]);

  const Summary = (
    <div className="flex justify-end p-2 border-t bg-white">
      <div className="flex flex-col w-80 gap-2">
        <div className="flex justify-between items-center">
          <div className="text-md font-semibold">Subtotal:</div>
          <RenderItem type="currency" value={subtotal} />
        </div>
        <div className="flex justify-between items-center">
          <div className="text-md font-semibold">VAT Total:</div>
          <RenderItem type="currency" value={vatAmount} />
        </div>
        <div className="flex justify-between items-center">
          <div className="text-md font-semibold">Total Amount:</div>
          <RenderItem type="currency" value={totalAmount} />
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={create.isPending || update.isPending}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            {create.isPending || update.isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div className="mb-1 border-b w-full text-left">
        <SectionTitle title="Purchase Form" />
      </div>

      <div className="flex justify-between p-2 border-b">
        {/* Left column: model and modelId */}
        <div className="flex flex-col gap-1 w-1/2 pr-4">
          {["model", "modelId"].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <Label htmlFor={item} className="w-1/3 text-sm text-left">
                {item === "model" ? "Model" : "Model ID"}
              </Label>
              <RenderInput
                field={{ id: item }}
                value={formik.values[item]}
                onChange={(e) => formik.setFieldValue(item, e.target.value)}
                className="w-2/3 text-sm px-2 py-1 border rounded"
                disabled
              />
            </div>
          ))}
        </div>

        {/* Right column: fields + Add Row */}
        <div className="flex flex-col gap-1 w-1/2 pl-4">
          {[
            { item: "regNumber", label: "Purchase Number", type: "toggle" },
            { item: "description", label: "Description", type: "textarea" },
            { item: "date", label: "Date", type: "date" },
            { item: "dueDate", label: "Due Date", type: "date" },
          ].map((field) => (
            <div key={field.item} className="flex items-center gap-2">
              <Label htmlFor={field.item} className="w-1/3 text-sm text-left">
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

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={handleAddRow}
              className="mt-2 px-3 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
            >
              Add Row
            </Button>
          </div>
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

      <div className="sticky bottom-0 z-20">{Summary}</div>
    </form>
  );
};

export default PurchaseForm;
