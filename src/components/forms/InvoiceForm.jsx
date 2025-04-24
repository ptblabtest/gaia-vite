import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
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
  { item: "unitPrice", label: "Unit Price", type: "currency", width: 235 },
  { item: "amount", label: "Total Amount", type: "currency", width: 235 },
];

const InvoiceForm = () => {
  const { id } = useParams();
  const { data } = useEntity("invoices", id);
  const { create, update } = useMutateUrl("invoices");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...(data || {}),
      items: data?.items || [],
      vatRate: data?.vatRate ?? 11,
    },
    onSubmit: async (values) => {
      const payload = {
        ...values,
        items: values.items.map((item) => ({
          ...item,
          vatRate: values.vatRate || 0,
          id: item.id || undefined,
        })),
      };

      delete payload.vatRate; 

      let result;

      if (!values.id) {
        result = await create.mutateAsync(payload);
      } else {
        result = await update.mutateAsync({ id: values.id, item: payload });
      }

      const newId = values.id || result?.id;
      window.location.href = `/invoices/${newId}`;
    },
  });

  const handleItemChange = (index, fieldId, value) => {
    const updated = [...formik.values.items];
    const row = { ...updated[index], [fieldId]: value };

    const quantity =
      parseFloat(fieldId === "quantity" ? value : row.quantity) || 0;
    const unitPrice =
      parseFloat(fieldId === "unitPrice" ? value : row.unitPrice) || 0;
    const vatRate =
      parseFloat(fieldId === "vatRate" ? value : row.vatRate) || 0;

    const base = quantity * unitPrice;
    const vat = (base * vatRate) / 100;
    row.amount = (base + vat).toFixed(2);

    updated[index] = row;
    formik.setFieldValue("items", updated);
  };

  const handleAddRow = () => {
    const newRow = itemFields.reduce((acc, f) => {
      acc[f.item] = "";
      return acc;
    }, {});
    formik.setFieldValue("items", [...formik.values.items, newRow]);
  };

  const subtotal = useMemo(() => {
    return formik.values.items.reduce(
      (acc, row) => acc + (parseFloat(row.amount) || 0),
      0
    );
  }, [formik.values.items]);

  const vatRate = parseFloat(formik.values.vatRate) || 0;
  const vatAmount = subtotal * (vatRate / 100);
  const totalAmount = subtotal + vatAmount;

  useEffect(() => {
    formik.setFieldValue("amount", subtotal.toFixed(2));
    formik.setFieldValue("vatAmount", vatAmount.toFixed(2));
    formik.setFieldValue("totalAmount", totalAmount.toFixed(2));
  }, [subtotal, vatAmount, totalAmount]);

  useEffect(() => {
    if (formik.values.items.length === 0) {
      handleAddRow();
    }
  }, [formik.values.items]);
  

  const Summary = (
    <div className="flex justify-end w-full">
      <div className="flex flex-col w-80">
        <div className="flex justify-between items-center border px-2 py-1">
          <div className="text-md font-semibold">Subtotal Amount</div>
          <RenderItem
            type="currency"
            value={formik.values.amount}
            className="text-md font-semibold"
          />
        </div>

        <div className="flex justify-between items-center border px-2 py-1">
          <div className="text-md font-semibold flex items-center gap-2">
            VAT
            <RenderInput
              field={{ id: "vatRate" }}
              value={formik.values.vatRate}
              onChange={(e) => formik.setFieldValue("vatRate", e.target.value)}
              type="percent"
              className="w-12 h-7"
            />
          </div>
          <RenderItem
            type="currency"
            value={formik.values.vatAmount}
            className="text-md font-semibold"
          />
        </div>

        <div className="flex justify-between items-center border px-2 py-1">
          <div className="text-md font-semibold">Total Amount</div>
          <RenderItem
            type="currency"
            value={formik.values.totalAmount}
            className="text-md font-semibold"
          />
        </div>

        <div className="flex justify-end p-2">
          <Button
            type="submit"
            disabled={create.isPending || update.isPending}
            className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            {create.isPending || update.isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-1 border-b w-full text-left">
        <SectionTitle title="Invoice Form" />
      </div>

      <div className="flex justify-between p-2 border-b">
        {/* Left column: client info */}
        <div className="flex flex-col">
          {[
            { item: "clientName", label: "Customer Name" },
            { item: "clientPicName", label: "Customer PIC Name" },
            {
              item: "clientAddress",
              label: "Customer Address",
              type: "textarea",
            },
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
        </div>

        {/* Right column: invoice metadata + Add Row */}
        <div className="flex flex-col gap-1 items-end">
          <div className="flex flex-col">
            {[
              { item: "regNumber", label: "Invoice Number" },
              { item: "date", label: "Date", type: "date" },
              { item: "clientNumber", label: "Customer Number" },
              { item: "projectNumber", label: "Project Number" },
              { item: "dueDate", label: "Payment Due Date", type: "date" },
            ].map((field) => (
              <div key={field.item} className="flex items-center mt-1">
                <Label htmlFor={field.item} className="w-1/2 text-sm text-left">
                  {field.label}
                </Label>
                <RenderInput
                  field={{ ...field, id: field.item }}
                  value={formik.values[field.item]}
                  onChange={(e) =>
                    formik.setFieldValue(field.item, e.target.value)
                  }
                  type={field.type || "text"}
                  className="w-1/2 text-sm px-2 py-1 border rounded"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="relative">
            <div
              className="grid bg-gray-100 border font-semibold items-center"
              style={{ gridTemplateColumns: "1fr 1fr" }}
            >
              <div className="px-2 py-1">Job/Activity</div>
              <div className="px-2 py-1">Payment Terms</div>
            </div>
            <div
              className="grid border-b items-center"
              style={{ gridTemplateColumns: "1fr 1fr" }}
            >
              <div className="border">
                <RenderInput
                  field={{ id: "activityName", rows: 5 }}
                  value={formik.values.activityName}
                  onChange={(e) =>
                    formik.setFieldValue("activityName", e.target.value)
                  }
                  type="textarea"
                  className="w-full"
                />
              </div>
              <div className="border">
                <RenderInput
                  field={{ id: "term", rows: 5 }}
                  value={formik.values.term}
                  onChange={(e) => formik.setFieldValue("term", e.target.value)}
                  type="textarea"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto border">
        <TableForm
          form={itemFields}
          data={formik.values.items}
          onChange={handleItemChange}
        />
      </div>

      {Summary}
    </form>
  );
};

export default InvoiceForm;
