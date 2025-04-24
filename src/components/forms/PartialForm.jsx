import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import useMutateUrl from "@/hooks/mutations";
import RenderInput from "@/config/RenderInput";
import Button from "@/components/Button";

function PartialForm({
  fields,
  entityName,
  id,
  initialData = {},
  onSuccess = null,
}) {
  const { update } = useMutateUrl(entityName);

  if (!id) {
    console.error("PartialForm requires an ID for update");
    return <div className="p-4 text-red-500">Error: ID is required</div>;
  }

  const getInitialValues = () => {
    const initialValues = {};
    fields.forEach((field) => {
      if (!field.item) return;
      initialValues[field.item] = initialData[field.item] ?? "";
    });
    return initialValues;
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const result = await update.mutateAsync({ id, item: values });
      if (onSuccess) onSuccess(result);
    } catch (error) {
      console.error("Partial update error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const renderField = (field, formikProps) => {
    const { values, handleChange, handleBlur } = formikProps;

    if (!field.item) return null;

    return (
      <div key={field.item} className="form-group flex w-full items-center py-1">
        {/* Label */}
        <div className="w-2/8 text-left">
          <label htmlFor={field.item} className="block text-md font-medium">
            {field.label}
          </label>
        </div>

        {/* Input */}
        <div className="w-6/8">
          <RenderInput
            field={{
              ...field,
              id: field.item,
            }}
            type={field.type || "text"}
            value={values[field.item]}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorMessage
            name={field.item}
            component="div"
            className="text-xs text-red-500 mt-1"
          />
        </div>
      </div>
    );
  };

  return (
    <Formik
      initialValues={getInitialValues()}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {(formikProps) => {
        const { isSubmitting } = formikProps;

        return (
          <Form className="partial-form">
            {fields.map((field) => renderField(field, formikProps))}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {isSubmitting ? "Updating..." : "Update"}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default PartialForm;
