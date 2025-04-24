import React, { useState } from "react";
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Button from "@/components/Button";
import RenderInput from "@/config/RenderInput";
import RenderItem from "@/config/RenderItem";
import customFieldRules from "@/config/customFieldRules";
import { fileConfig } from "@/config/entities/fileConfig";
import useMutateUrl from "@/hooks/mutations";
import { useEntityData } from "@/hooks/queries";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SectionTitle from "@/components/SectionTitle";
import FormConfirmationModal from "@/components/modals/FormConfirmationModal";

const FileForm = ({ model, modelId }) => {
  const queryParams = model && modelId ? { model, modelId } : {};
  const { data: files = [], isLoading } = useEntityData("files", queryParams);
  const { create, update, remove } = useMutateUrl(
    "files",
    model && modelId ? { model, modelId } : {}
  );

  const [editingFileId, setEditingFileId] = useState(null);
  const [deleteFileId, setDeleteFileId] = useState(null);
  const isDeleteModalOpen = deleteFileId !== null;

  const fields = fileConfig.form;

  const initialValues = fields.reduce((acc, field) => {
    acc[field.item] = field.defaultValue ?? "";
    return acc;
  }, {});

  const validationSchema = toFormikValidationSchema(
    z.object(
      fields.reduce((acc, field) => {
        acc[field.item] = z
          .string()
          .min(1, `${field.label || field.item} is required`);
        return acc;
      }, {})
    )
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      if (editingFileId) {
        await update.mutateAsync({ id: editingFileId, item: values });
        setEditingFileId(null);
      } else {
        await create.mutateAsync(values);
      }
      resetForm();
    },
  });

  const renderField = (field) => {
    const mergedField = {
      ...field,
      ...(customFieldRules[field.item] || {}),
    };

    return (
      <RenderInput
        key={field.item}
        field={{
          ...mergedField,
          id: field.item,
        }}
        type={field.type || "text"}
        value={formik.values[field.item]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched[field.item] && formik.errors[field.item]}
      />
    );
  };

  const handleEdit = (file) => {
    formik.setValues({
      title: file.title,
      url: file.url,
    });
    setEditingFileId(file.id);
  };

  const handleCancelEdit = () => {
    setEditingFileId(null);
    formik.resetForm();
  };

  const confirmDelete = async () => {
    await remove.mutateAsync(deleteFileId);
    if (editingFileId === deleteFileId) handleCancelEdit();
    setDeleteFileId(null);
  };

  return (
    <div className="flex flex-col bg-white h-full">
      <div className="border-b">
        <SectionTitle title="File Upload" />
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="p-1 border-b flex items-center gap-2"
      >
        {fields.map((field) => renderField(field))}
        <Button
          type="submit"
          disabled={formik.isSubmitting}
          className={`text-white text-xs px-2 py-2 rounded-md ${
            editingFileId
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editingFileId ? "Update" : "Submit"}
        </Button>
        {editingFileId && (
          <Button
            type="button"
            onClick={handleCancelEdit}
            className="bg-gray-500 hover:bg-gray-600 text-white text-xs px-2 py-2 rounded-md"
          >
            Cancel
          </Button>
        )}
      </form>

      {/* File List */}
      <div className="flex-1 overflow-y-auto p-1 space-y-2">
        {isLoading ? (
          <div className="text-center text-gray-500 py-4">Loading files...</div>
        ) : files.length > 0 ? (
          <ul className="divide-y divide-gray-200 border rounded">
            {files.map((file) => (
              <li
                key={file.id}
                className="flex justify-between items-center px-3 py-2 hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3 w-0 flex-1">
                  <div className="h-8 w-8 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center font-bold">
                    {file.createdByName
                      ? file.createdByName
                          .split(" ")
                          .map((w) => w[0])
                          .join("")
                          .toUpperCase()
                      : "?"}
                  </div>
                  <div className="flex flex-col w-full">
                    <span className="truncate font-medium">{file.title}</span>
                    <span className="font-semibold text-sm">
                      {file.createdByName || "Unknown"}
                    </span>
                    <RenderItem type="date" value={file.createdAt} />
                  </div>
                </div>

                <div className="shrink-0">
                  <RenderItem type="url" value={file.url} />
                </div>

                <div className="flex flex-col space-y-1 ml-2">
                  <Button
                    onClick={() => handleEdit(file)}
                    className="p-1 hover:bg-gray-100"
                  >
                    <EditIcon fontSize="small" className="text-blue-600" />
                  </Button>
                  <Button
                    onClick={() => setDeleteFileId(file.id)}
                    className="p-1 hover:bg-gray-100"
                  >
                    <DeleteIcon fontSize="small" className="text-red-600" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-500 py-4">
            No files available
          </div>
        )}
      </div>

      <FormConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteFileId(null)}
        onConfirm={confirmDelete}
        mode="delete"
      />
    </div>
  );
};

export default FileForm;
