import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import useMutateUrl from "@/hooks/mutations";
import { useEntity } from "@/hooks/useEntity";
import TableForm from "@/components/forms/TableForm";
import RenderInput from "@/config/RenderInput";
import RenderItem from "@/config/RenderItem";
import Button from "@/components/Button";
import { expenseConfig } from "@/config/entities/expenseConfig";

const ExpenseForm = ({ ...props }) => {
  const [searchParams] = useSearchParams();
  const fundId = searchParams.get("fundId") || props.fundId;
  const form = expenseConfig.form;

  const { data } = useEntity("expenses", null, { fundId });
  const { updateMultiple } = useMutateUrl("expenses");
  const { initialData: fundData } = useEntity("funds", fundId, {
    mode: "form",
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { tableData: data || [] },
    onSubmit: async (values) => {
      const allowedFields = form.map((field) => field.item);
      const payload = values.tableData.map((item) => {
        const sanitized = {};
        allowedFields.forEach((key) => {
          if (key in item) sanitized[key] = item[key];
        });

        if (item.id) {
          sanitized.id = item.id;
          delete sanitized.fundId;
        } else {
          sanitized.fundId = fundId;
        }

        return sanitized;
      });

      await updateMultiple.mutateAsync(payload);
      window.location.href = `/funds/${fundId}`;
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
    const newRow = form.reduce((acc, field) => {
      acc[field.item] = "";
      return acc;
    }, {});
    newRow.fundId = fundId;
    newRow.order = formik.values.tableData.length + 1;
    formik.setFieldValue("tableData", [...formik.values.tableData, newRow]);
  };

  const handleDelete = (index) => {
    const updated = formik.values.tableData.filter((_, i) => i !== index);
    updated.forEach((row, i) => (row.order = i + 1));
    formik.setFieldValue("tableData", updated);
  };

  const totalAmount = useMemo(() => {
    return formik.values.tableData.reduce(
      (acc, row) => acc + (parseFloat(row.amount) || 0),
      0
    );
  }, [formik.values.tableData]);

  const TopSection = (
    <div className="flex justify-between items-center mb-1 border-b">
      <div className="flex gap-4 max-w-xl w-full">
        <div className="flex flex-col gap-2 text-md font-bold text-left pt-1 w-24">
          <div>Fund:</div>
        </div>
        <div className="flex flex-col flex-1">
          <RenderInput
            field={{
              id: "fundId",
              label: "Fund",
              item: "fundId",
              disabled: true,
            }}
            type="select"
            value={fundId}
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
    <div className="flex justify-between items-center p-4 w-full border-t">
      <div className="text-md font-semibold">Total Expense:</div>
      <RenderItem
        type="currency"
        value={totalAmount}
        className="text-md font-semibold"
      />
      <Button
        type="submit"
        disabled={updateMultiple.isPending}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
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
          form={form}
          data={formik.values.tableData}
          onChange={handleInputChange}
          onDeleteRow={handleDelete}
        />
      </div>

      <div className="flex justify-end bg-white">{BottomRight}</div>
    </form>
  );
};

export default ExpenseForm;
