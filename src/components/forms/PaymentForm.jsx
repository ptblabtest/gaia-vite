import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import useMutateUrl from "@/hooks/mutations";
import { useEntity } from "@/hooks/useEntity";
import TableForm from "@/components/forms/TableForm";
import RenderInput from "@/config/RenderInput";
import RenderItem from "@/config/RenderItem";
import Button from "@/components/Button";

const paymentFields = [
  { item: "description", label: "Description", width: 300 },
  { item: "amount", label: "Amount", type: "currency", width: 170 },
  { item: "date", label: "Date", type: "date", width: 170 },
  {
    item: "type",
    label: "Type",
    type: "select",
    options: [
      { label: "PAID", value: "PAID" },
      { label: "RECEIVED", value: "RECEIVED" },
    ],
  },
  {
    item: "tag",
    label: "Tag",
    type: "select",
    options: [
      { label: "ADVANCE", value: "ADVANCE" },
      { label: "RETURN", value: "RETURN" },
    ],
    width: 170,
  },
];

const PaymentForm = ({ ...props }) => {
  const [searchParams] = useSearchParams();
  const model = searchParams.get("model") || props.model;
  const modelId = searchParams.get("modelId") || props.modelId;

  const { data } = useEntity("payments", null, { model, modelId });
  const { updateMultiple } = useMutateUrl("payments");

  const isFundModel = model === "Fund";
  const { initialData: fundData } = useEntity("funds", modelId, {
    enabled: isFundModel,
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { tableData: data || [] },
    onSubmit: async (values) => {
      const allowedFields = paymentFields.map((f) => f.item);
      const payload = values.tableData.map((item) => {
        const sanitized = {};
        allowedFields.forEach((key) => {
          if (key in item) sanitized[key] = item[key];
        });

        if (item.id) {
          sanitized.id = item.id;
          delete sanitized.model;
          delete sanitized.modelId;
        } else {
          sanitized.model = model;
          sanitized.modelId = modelId;
        }

        return sanitized;
      });

      await updateMultiple.mutateAsync(payload);
      window.location.href = `/${model.toLowerCase()}s/${modelId}`;
    },
  });

  const handleInputChange = (index, fieldId, value) => {
    const updatedRow = { ...formik.values.tableData[index], [fieldId]: value };
    const updated = [
      ...formik.values.tableData.slice(0, index),
      updatedRow,
      ...formik.values.tableData.slice(index + 1),
    ];
    formik.setFieldValue("tableData", updated);
  };

  const handleAddRow = () => {
    const newRow = paymentFields.reduce((acc, field) => {
      acc[field.item] = "";
      return acc;
    }, {});
    newRow.model = model;
    newRow.modelId = modelId;
    newRow.order = formik.values.tableData.length + 1;
    formik.setFieldValue("tableData", [...formik.values.tableData, newRow]);
  };

  const handleDelete = (index) => {
    const updated = formik.values.tableData.filter((_, i) => i !== index);
    updated.forEach((row, i) => (row.order = i + 1));
    formik.setFieldValue("tableData", updated);
  };
  const { data: expenseData = [] } = useEntity("expenses", null, {
    fundId: modelId,
  });
  
  
  const totalExpense = useMemo(() => {
    return expenseData.reduce((acc, row) => acc + (parseFloat(row.amount) || 0), 0);
  }, [expenseData]);
  


  const totalAmount = useMemo(() => {
    return formik.values.tableData.reduce(
      (acc, row) => acc + (parseFloat(row.amount) || 0),
      0
    );
  }, [formik.values.tableData]);

  const totalPaid = useMemo(() => {
    return formik.values.tableData.reduce(
      (acc, row) => acc + (row.type === "PAID" ? parseFloat(row.amount) || 0 : 0),
      0
    );
  }, [formik.values.tableData]);

  const totalReceived = useMemo(() => {
    return formik.values.tableData.reduce(
      (acc, row) => acc + (row.type === "RECEIVED" ? parseFloat(row.amount) || 0 : 0),
      0
    );
  }, [formik.values.tableData]);

  const fundAmount = isFundModel ? parseFloat(fundData?.amount || 0) : 0;
  const remaining = fundAmount - totalPaid;
  const totalReturn = totalExpense - totalPaid;
  

  const TopSection = (
    <div className="flex justify-between items-center mb-1 border-b">
      <div className="flex gap-4 max-w-xl w-full">
        <div className="flex flex-col gap-2 text-md font-bold text-left pt-1 w-24">
          <div>Model:</div>
          <div>Model ID:</div>
        </div>
        <div className="flex flex-col flex-1 gap-2">
          <RenderInput
            field={{ id: "model", label: "Model", disabled: true }}
            value={model}
            className="w-full"
          />
          <RenderInput
            field={{ id: "modelId", label: "Model ID", disabled: true }}
            value={modelId}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 pl-4">
        <Button
          type="button"
          onClick={handleAddRow}
          className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
        >
          Add Row
        </Button>
      </div>
    </div>
  );

  const BottomRight = (
    <div className="flex flex-col items-end gap-2 p-4 w-full border-t">
      <div className="text-md flex gap-4 justify-between w-full max-w-sm">
        <div className="font-semibold">Total PAID:</div>
        <RenderItem type="currency" value={totalPaid} />
      </div>
      <div className="text-md flex gap-4 justify-between w-full max-w-sm">
        <div className="font-semibold">Total RECEIVED:</div>
        <RenderItem type="currency" value={totalReceived} />
      </div>
      {isFundModel && (
        <>
          <div className="text-md flex gap-4 justify-between w-full max-w-sm">
            <div className="font-semibold">Fund Amount:</div>
            <RenderItem type="currency" value={fundAmount} />
          </div>
          <div className="text-md flex gap-4 justify-between w-full max-w-sm">
            <div className="font-semibold">Remaining:</div>
            <RenderItem type="currency" value={remaining} />
          </div>
        </>
      )}
      <div className="text-md flex gap-4 justify-between w-full max-w-sm border-t pt-2 mt-2">
        <div className="font-semibold">Total Payment:</div>
        <RenderItem type="currency" value={totalAmount} />
      </div>

      <div className="text-md flex gap-4 justify-between w-full max-w-sm">
  <div className="font-semibold">Total Expense:</div>
  <RenderItem type="currency" value={totalExpense} />
</div>
<div className="text-md flex gap-4 justify-between w-full max-w-sm">
  <div className="font-semibold">Total RETURN:</div>
  <RenderItem type="currency" value={totalReturn} />
</div>

      <Button
        type="submit"
        disabled={updateMultiple.isPending}
        className="mt-3 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
      >
        {updateMultiple.isPending ? "Submitting..." : "Submit"}
      </Button>
    </div>
  );

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-2">
      <div className="flex flex-col bg-white">{TopSection}</div>

      <div className="overflow-x-auto border">
        <TableForm
          form={paymentFields}
          data={formik.values.tableData}
          onChange={handleInputChange}
          onDeleteRow={handleDelete}
        />
      </div>

      <div className="flex justify-end bg-white">{BottomRight}</div>
    </form>
  );
};

export default PaymentForm;
