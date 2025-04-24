import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import { milestoneConfig } from "@/config/entities/milestoneConfig";
import useMutateUrl from "@/hooks/mutations";
import { useEntity } from "@/hooks/useEntity";
import TableForm from "@/components/forms/TableForm";
import RenderInput from "@/config/RenderInput";
import RenderItem from "@/config/RenderItem";
import Button from "@/components/Button";

const MilestoneForm = ({ ...props }) => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectId") || props.projectId;
  const form = milestoneConfig.form;

  const { data } = useEntity("milestones", null, { projectId });
  const { updateMultiple } = useMutateUrl("milestones");
  const { initialData: projectData } = useEntity("projects", projectId, {
    mode: "form",
  });
  const { data: contracts = [] } = useEntity("contracts", null, {
    id: projectData?.contractId,
  });

  const contract = contracts[0] || {};
  const contractAmount = contract.amount || 0;
  const contractStartDate = contract.startDate || "";
  const contractEndDate = contract.endDate || "";

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
          delete sanitized.projectId;
        } else {
          sanitized.projectId = projectId;
        }

        return sanitized;
      });

      await updateMultiple.mutateAsync(payload);
      window.location.href = `/projects/${projectId}`;
    },
  });

  const handleInputChange = (index, fieldId, value) => {
    const updatedRow = { ...formik.values.tableData[index], [fieldId]: value };

    if (fieldId === "share") {
      const share = parseFloat(value) || 0;
      updatedRow.amount = contractAmount * (share / 100);
    } else if (fieldId === "amount") {
      const amount = parseFloat(value) || 0;
      updatedRow.share = (amount / contractAmount) * 100;
    }

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
    newRow.order = formik.values.tableData.length + 1;
    newRow.projectId = projectId;
    formik.setFieldValue("tableData", [...formik.values.tableData, newRow]);
  };

  useEffect(() => {
    if (formik.values.tableData.length === 0) {
      handleAddRow();
    }
  }, [formik.values.tableData]);

  const handleDelete = (index) => {
    const updated = formik.values.tableData.filter((_, i) => i !== index);
    updated.forEach((row, i) => (row.order = i + 1));
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

  useEffect(() => {
    const errors = {
      shareExceeded: false,
      invalidDates: false,
      outOfContractRange: false,
      overlappingDates: false,
    };

    const ranges = [];

    for (const row of formik.values.tableData) {
      const { startDate, endDate } = row;
      if (!startDate || !endDate) continue;

      const start = new Date(startDate);
      const end = new Date(endDate);
      const contractStart = new Date(contractStartDate);
      const contractEnd = new Date(contractEndDate);

      // Check 1: Start must be <= End
      if (start > end) {
        errors.invalidDates = true;
      }

      // Check 2: Must be within contract range
      if (start < contractStart || end > contractEnd) {
        errors.outOfContractRange = true;
      }

      // Check 3: No overlapping
      for (const [prevStart, prevEnd] of ranges) {
        const overlap =
          (start >= prevStart && start <= prevEnd) ||
          (end >= prevStart && end <= prevEnd) ||
          (start <= prevStart && end >= prevEnd);
        if (overlap) {
          errors.overlappingDates = true;
        }
      }

      ranges.push([start, end]);
    }

    // Check 4: Total share must not exceed 100
    if (totals.share > 100) {
      errors.shareExceeded = true;
    }

    formik.setFieldValue("validationErrors", errors, false);
  }, [
    formik.values.tableData,
    contractStartDate,
    contractEndDate,
    totals.share,
  ]);

  const validationErrors = formik.values.validationErrors || {};
  const hasAnyError = Object.values(validationErrors).some(Boolean);

  const BottomNotesContent = [
    "Total Share = 100%",
    "Total Milestone Amount = Contract Amount",
  ];

  const BottomSummaryNotes = [
    { label: "Total Milestone Amount:", type: "currency", key: "amount" },
    { label: "Contract Amount:", type: "currency", key: "contractAmount" },
    { label: "Remaining Share:", type: "percent", key: "remainingShare" },
  ];

  const BottomSummaryData = {
    amount: totals.amount,
    contractAmount: contractAmount,
    remainingShare: 100 - totals.share,
  };

  const TopSection = (
    <div className="flex justify-between items-center mb-1 border-b">
      <div className="flex gap-4 max-w-2xl w-full">
        <div className="flex flex-col gap-4 justify-start text-md font-bold text-left pt-1 w-24">
          <div>Project:</div>
          <div>Contract Period:</div>
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
          <div className="flex items-center gap-2">
            <RenderItem
              type="date"
              value={contractStartDate}
              className="text-md font-semibold"
            />
            <div>-</div>
            <RenderItem
              type="date"
              value={contractEndDate}
              className="text-md font-semibold"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0 pl-4">
        {hasAnyError && (
          <div className="text-sm text-red-600 font-semibold whitespace-nowrap">
            {validationErrors.shareExceeded && "Total Share cannot exceed 100%"}
            {validationErrors.invalidDates &&
              " — Start date must be before End date"}
            {validationErrors.outOfContractRange &&
              " — Dates must be within contract range"}
            {validationErrors.overlappingDates &&
              " — Milestone dates must not overlap"}
          </div>
        )}

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

  const BottomLeft = (
    <div className="flex flex-col text-left p-4 w-5/8">
      <div className="text-md font-bold mb-2">Important Information</div>
      <div className="text-sm text-gray-600">
        Please ensure that:
        <ul className="list-disc ml-4 mt-2">
          {BottomNotesContent.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  const BottomRight = (
    <div className="flex flex-col p-4 w-3/8 gap-2">
      {BottomSummaryNotes.map((item, index) => (
        <div key={index} className="flex justify-between items-center">
          <div className="text-md font-semibold">{item.label}</div>
          <RenderItem
            type={item.type}
            value={BottomSummaryData[item.key]}
            className="text-md font-semibold"
          />
        </div>
      ))}
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={updateMultiple.isPending || hasAnyError}
          className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          {updateMultiple.isPending ? "Submitting..." : "Submit"}
        </Button>
      </div>
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

      <div className="flex justify-between bg-white border-t">
        {BottomLeft}
        {BottomRight}
      </div>
    </form>
  );
};

export default MilestoneForm;
