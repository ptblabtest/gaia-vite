import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import SectionTitle from "@/components/SectionTitle";
import Stats from "@/components/Stats";
import RenderItem from "@/config/RenderItem";
import RenderInput from "@/config/RenderInput";
import Button from "@/components/Button";
import TableForm from "@/components/forms/TableForm";
import { taskConfig } from "@/config/entities/taskConfig";
import { useEntity } from "@/hooks/useEntity";
import useMutateUrl from "@/hooks/mutations";

const TaskForm = ({ ...props }) => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectId") || props.projectId;
  const form = taskConfig.form;

  const { data: milestones = [] } = useEntity("milestones", null, {
    projectId,
  });

  const { data: tasks = [] } = useEntity("tasks", null, {
    mode: "form",
  });

  const { updateMultiple } = useMutateUrl("tasks");

  const { data: budgets = [] } = useEntity("budgets", null, {
    model: "Project",
    modelId: projectId,
  });
  
  const budgetAmount = budgets[0]?.amount || 0;
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { tableData: tasks || [] },
    onSubmit: async (values) => {
      const allowedFields = form.map((field) => field.item);

      const payload = values.tableData.map((item) => {
        const sanitized = {};
        allowedFields.forEach((key) => {
          if (key in item) sanitized[key] = item[key];
        });

        if (item.id) {
          sanitized.id = item.id;
          delete sanitized.milestoneId;
        } else {
          sanitized.milestoneId = item.milestoneId;
        }

        return sanitized;
      });

      await updateMultiple.mutateAsync(payload);
    },
  });

  const handleInputChange = (index, fieldId, value) => {
    const updated = [...formik.values.tableData];
    const row = { ...updated[index], [fieldId]: value };

    if (fieldId === "share") {
      const share = parseFloat(value) || 0;
      row.amount = (budgetAmount * (share / 100)).toFixed(2);
    } else if (fieldId === "amount") {
      const amount = parseFloat(value) || 0;
      row.share = ((amount / budgetAmount) * 100).toFixed(2);
    }

    updated[index] = row;
    formik.setFieldValue("tableData", updated);
  };

  const handleAddRow = (milestoneId) => {
    const currentTasks = formik.values.tableData.filter(
      (t) => t.milestoneId === milestoneId
    );

    const newRow = form.reduce((acc, field) => {
      acc[field.item] = "";
      return acc;
    }, {});

    newRow.order = currentTasks.length + 1;
    newRow.milestoneId = milestoneId;

    formik.setFieldValue("tableData", [...formik.values.tableData, newRow]);
  };

  useEffect(() => {
    if (formik.values.tableData.length === 0) {
      handleAddRow();
    }
  }, [formik.values.tableData]);

  const handleDelete = (index) => {
    const updated = formik.values.tableData.filter((_, i) => i !== index);
    updated.forEach((row) => {
      if (row.milestoneId) {
        const sameMilestone = updated.filter(
          (t) => t.milestoneId === row.milestoneId
        );
        sameMilestone.forEach((t, j) => (t.order = j + 1));
      }
    });
    formik.setFieldValue("tableData", updated);
  };

  const totals = useMemo(() => {
    return formik.values.tableData.reduce(
      (acc, row) => {
        acc.amount += parseFloat(row.amount) || 0;
        acc.share += parseFloat(row.share) || 0;
        return acc;
      },
      { amount: 0, share: 0 }
    );
  }, [formik.values.tableData]);

  const errorShare = useMemo(() => totals.share > 100, [totals.share]);

  const TopSection = (
    <div className="flex justify-between items-center p-2 border rounded-md">
      <div className="flex gap-4 max-w-md w-full">
        <div className="flex flex-col gap-4 justify-start text-md text-left font-bold px-1 pt-1">
          <div>Project :</div>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <RenderInput
            field={{
              id: "projectId",
              label: "Project",
              item: "projectId",
              disabled: true,
            }}
            type="select"
            value={projectId}
            className="w-full"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0 pr-1">
        {errorShare && (
          <div className="text-sm text-red-600 font-semibold whitespace-nowrap">
            Total Share cannot exceed 100%
          </div>
        )}
        <Button
          type="submit"
          disabled={updateMultiple.isPending || errorShare}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Submit Tasks
        </Button>
      </div>
    </div>
  );

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col bg-white">
          <div className="flex flex-col bg-white">{TopSection}</div>
          <div className="flex flex-col bg-white">
      <Stats
        items={[
          {
            label: "Budget Amount",
            value: budgetAmount,
            type: "currency",
            color: "blue",
            textColor: "blue",
          },
          {
            label: "Total Task Amount",
            value: totals.amount,
            type: "currency",
            color: totals.amount > budgetAmount ? "red" : "green",
            textColor: totals.amount > budgetAmount ? "red" : "green",
          },
          {
            label: "Total Share",
            value: totals.share,
            type: "percent",
            color: "yellow",
            textColor: "yellow",
          },
          {
            label: "Remaining Share",
            value: 100 - totals.share,
            type: "percent",
            color: totals.share > 100 ? "red" : "purple",
            textColor: totals.share > 100 ? "red" : "purple",
          },
        ]}
      />
      </div>
      <div className="overflow-x-auto border">
      <TableForm
        form={form.filter((f) => f.item !== "milestoneId")}
        data={formik.values.tableData}
        onChange={handleInputChange}
        onDeleteRow={handleDelete}
        onAddRow={handleAddRow}
        groupBy={{
          data: milestones,
          key: "milestoneId",
          header: (milestone) => (
            <div className="font-semibold">
              [{milestone.order}] {milestone.title}
              <span className="ml-2 text-sm text-gray-600">
                (
                <RenderItem type="date" value={milestone.startDate} /> -{" "}
                <RenderItem type="date" value={milestone.endDate} />)
              </span>
            </div>
          ),
        }}
      />
      </div>
    </form>
  );
};

export default TaskForm;
