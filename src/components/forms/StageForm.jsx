import React, { useState } from "react";
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Button from "@/components/Button";
import RenderInput from "@/config/RenderInput";
import customFieldRules from "@/config/customFieldRules";
import useMutateUrl from "@/hooks/mutations";
import SectionTitle from "@/components/SectionTitle";
import FormConfirmationModal from "@/components/modals/FormConfirmationModal";
import { stageConfig } from "@/config/entities/stageConfig";
import { useEntity } from "@/hooks/useEntity";

const StageForm = ({ model, modelId }) => {
  const fields = stageConfig.form(model);
  const queryParams = model && modelId ? { model, modelId } : {};
  const { Table } = useEntity("stages", null, queryParams);
  const { create } = useMutateUrl(
    "stages",
    model && modelId ? { model, modelId } : {}
  );

  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  const initialValues = fields.reduce((acc, field) => {
    acc[field.item] = field.defaultValue ?? "";
    return acc;
  }, {});

  const schemaShape = fields.reduce((acc, field) => {
    acc[field.item] = z.string().min(1, "This field is required");
    return acc;
  }, {});

  const validationSchema = toFormikValidationSchema(z.object(schemaShape));

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      await create.mutateAsync(values);
      resetForm();
      setShowSubmitConfirm(true);
    },
  });

  return (
    <div className="flex flex-col bg-white">
      <SectionTitle title={`Stage History`} />
      <div className="p-2">{Table}</div>
      <SectionTitle title="Update Stage" />
      <form onSubmit={formik.handleSubmit} className="p-2 border-b space-y-2">
        {fields.map((field) => (
          <RenderInput
            key={field.item}
            field={{
              ...field,
              ...(customFieldRules[field.item] || {}),
              id: field.item,
            }}
            type={field.type || "text"}
            value={formik.values[field.item]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched[field.item] && formik.errors[field.item]}
          />
        ))}
        <div className="text-right pt-2">
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-md"
          >
            Submit
          </Button>
        </div>
      </form>

      <FormConfirmationModal
        isOpen={showSubmitConfirm}
        onClose={() => setShowSubmitConfirm(false)}
        mode="create"
      />
    </div>
  );
};

export default StageForm;
