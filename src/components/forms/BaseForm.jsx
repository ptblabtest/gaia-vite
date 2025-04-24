import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import useMutateUrl from "@/hooks/mutations";
import RenderInput from "@/config/RenderInput";
import Button from "@/components/Button";
import customFieldRules from "@/config/customFieldRules";
import { useSearchParams } from "react-router-dom";

function BaseForm({
  fields,
  entityName = "form-submissions",
  mode = "create",
  initialData = {},
  id = null,
  onSuccess = null,
  customRender = null,
  notesSection = null,
}) {
  const [searchParams] = useSearchParams();
  const searchParamObject = Object.fromEntries([...searchParams.entries()]);

  const { create, update, remove, createMultiple, updateMultiple } =
    useMutateUrl(entityName);

  const NotesSection = () =>
    notesSection ? (
      <div className="my-1 w-full text-left">
        <h3 className="text-lg font-semibold border-b pb-1">
          {notesSection.title}
        </h3>
        <ul className="list-disc list-inside text-sm mt-2 space-y-1">
          {notesSection.content.map((note, idx) => (
            <li key={idx}>
              {note.text}
              {note.url && (
                <>
                  {" "}
                  <a
                    href={note.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800 text-xs ml-2"
                  >
                    [link]
                  </a>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    ) : null;

  const getInitialValues = () => {
    const initialValues = {};

    fields.forEach((field) => {
      if (!field.item) return;

      const fromSearch = searchParamObject[field.item];

      if (
        (mode === "update" || mode === "view") &&
        Object.prototype.hasOwnProperty.call(initialData, field.item)
      ) {
        initialValues[field.item] = initialData[field.item];
      } else {
        if (field.type === "array") {
          initialValues[field.item] =
            initialData[field.item] ??
            field.defaultValue ??
            (field.subFields ? [{}] : []);
        } else {
          initialValues[field.item] =
            mode === "create" && fromSearch !== undefined
              ? fromSearch
              : initialData[field.item] ?? field.defaultValue ?? "";
        }
      }
    });

    return initialValues;
  };

  const createValidationSchema = () => {
    const schema = {};

    fields.forEach((field) => {
      if (!field.item) return;

      if (field.type === "array" && field.subFields) {
        const subSchema = {};
        field.subFields.forEach((sub) => {
          subSchema[sub.item] = z.any();
        });
        schema[field.item] = z.array(z.object(subSchema));
      } else if (field.type === "array") {
        schema[field.item] = z.array(z.any());
      } else {
        schema[field.item] = z.any();
      }
    });

    if (!fields.length) return z.object({}).optional();
    return toFormikValidationSchema(z.object(schema));
  };

  const handleSubmit = async (values, formikBag) => {
    const { setSubmitting, resetForm } = formikBag;

    try {
      let result;

      switch (mode) {
        case "create":
          result = await create.mutateAsync(values);

          resetForm();
          break;

        case "update":
          if (!id) throw new Error("ID is required for update mode");
          result = await update.mutateAsync({ id, item: values });
          break;

        case "delete":
          if (!id) throw new Error("ID is required for delete mode");
          await remove.mutateAsync(id);
          resetForm();
          break;

        case "bulkCreate":
          result = await createMultiple.mutateAsync(
            Array.isArray(values) ? values : [values]
          );
          resetForm();
          break;

        case "bulkUpdate":
          result = await updateMultiple.mutateAsync(
            Array.isArray(values) ? values : [values]
          );
          break;

        case "view":
          return;

        default:
          throw new Error(`Unsupported form mode: ${mode}`);
      }

      if (onSuccess && result) {
        onSuccess(result);
      }
    } catch (error) {
      console.error(`Unexpected error in ${mode} operation:`, error);
    } finally {
      setSubmitting(false);
    }
  };

  const renderField = (field, formikProps) => {
    if (!field.item) {
      if (field.label) {
        return (
          <div key={field.label} className="my-2 w-full text-left">
            <h3 className="text-lg font-semibold border-b pb-1">
              {field.label}
            </h3>
          </div>
        );
      }
      return null;
    }

    const { values, handleChange, handleBlur } = formikProps;

    const customRules = customFieldRules[field.item] || {};
    const mergedField = {
      ...field,
      ...customRules,
    };

    return (
      <React.Fragment key={field.item}>
        {mergedField.section && (
          <div className="w-full text-left">
            <h3 className="text-lg font-semibold border-b pb-1">
              {mergedField.section}
            </h3>
          </div>
        )}

        <div className="form-group flex w-full items-center py-1">
          {/* Label column */}
          <div className="w-2/8 flex text-left items-center">
            <label htmlFor={field.item} className="block text-md font-medium">
              {mergedField.label}
            </label>
          </div>

          {/* Input and extra info column */}
          <div className="w-6/8">
            <div className="flex flex-col">
              {/* Input */}
              <div className="flex items-center">
                <RenderInput
                  field={{
                    ...mergedField,
                    id: field.item,
                    disabled:
                      mode === "view" || field.disabled || mode === "delete",
                  }}
                  type={field.type || "text"}
                  value={values[field.item]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              {/* Sublabel */}
              {mergedField.sublabel && (
                <div className="text-sm text-gray-500 text-left">
                  {mergedField.sublabel}
                </div>
              )}

              {/* Validation error */}
              <ErrorMessage
                name={field.item}
                component="div"
                className="text-xs text-red-500 mt-1"
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  return (
    <Formik
      initialValues={getInitialValues()}
      validationSchema={createValidationSchema()}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {(formikProps) => {
        const { isSubmitting } = formikProps;

        return (
          <Form className="contact-form">
            {fields.map((field, index) => {
              if (customRender) {
                const custom = customRender(
                  field,
                  formikProps,
                  renderField,
                  fields,
                  {
                    initialData
                  }
                );
                if (custom !== null)
                  return <React.Fragment key={index}>{custom}</React.Fragment>;
              }
              return renderField(field, formikProps);
            })}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {isSubmitting
                ? mode === "update"
                  ? "Updating..."
                  : "Submitting..."
                : mode === "update"
                ? "Update"
                : "Submit"}
            </Button>
            <NotesSection />
          </Form>
        );
      }}
    </Formik>
  );
}

export default BaseForm;
