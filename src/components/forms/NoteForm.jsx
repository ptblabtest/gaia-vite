import React, { useState } from "react";
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Button from "@/components/Button";
import RenderInput from "@/config/RenderInput";
import customFieldRules from "@/config/customFieldRules";
import { noteConfig } from "@/config/entities/noteConfig";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useMutateUrl from "@/hooks/mutations";
import { useEntityData } from "@/hooks/queries";
import SectionTitle from "@/components/SectionTitle";
import FormConfirmationModal from "@/components/modals/FormConfirmationModal";

const NoteForm = ({ model, modelId }) => {
  const queryParams = model && modelId ? { model, modelId } : {};
  const { data: notes = [], isLoading } = useEntityData("notes", queryParams);
  const { create, update, remove } = useMutateUrl(
    "notes",
    model && modelId ? { model, modelId } : {}
  );

  const [editingNoteId, setEditingNoteId] = useState(null);
  const [deleteNoteId, setDeleteNoteId] = useState(null);
  const isDeleteModalOpen = deleteNoteId !== null;

  const fields = noteConfig.form;

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
      if (editingNoteId !== null) {
        await update.mutateAsync({ id: editingNoteId, item: values });
        setEditingNoteId(null);
      } else {
        await create.mutateAsync(values);
      }
      resetForm();
    },
  });

  const handleEdit = (note) => {
    formik.setValues({ description: note.description });
    setEditingNoteId(note.id);
  };

  const handleCancelEdit = () => {
    setEditingNoteId(null);
    formik.resetForm();
  };

  const confirmDelete = async () => {
    await remove.mutateAsync(deleteNoteId);
    if (editingNoteId === deleteNoteId) handleCancelEdit();
    setDeleteNoteId(null);
  };

  return (
    <div className="flex flex-col bg-white h-full">
      <div className="border-b">
        <SectionTitle title="Notes" />
      </div>
      <form onSubmit={formik.handleSubmit} className="p-1 border-b">
        <RenderInput
          field={{
            ...fields[0],
            ...(customFieldRules[fields[0].item] || {}),
            id: fields[0].item,
          }}
          type={fields[0].type || "text"}
          value={formik.values[fields[0].item]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched[fields[0].item] && formik.errors[fields[0].item]
          }
        />
        <div className="text-right pt-1 space-x-2">
          {editingNoteId !== null && (
            <Button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-400 hover:bg-gray-500 text-white text-sm px-2 py-2 rounded-md"
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            disabled={!formik.values.description || formik.isSubmitting}
            className={`text-white text-sm px-2 py-2 rounded-md ${
              editingNoteId
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-500 hover:bg-blue-700"
            }`}
          >
            {editingNoteId ? "Save" : "Submit"}
          </Button>
        </div>
      </form>

      <div className="flex-1 overflow-y-auto p-1 space-y-2">
        {isLoading ? (
          <div className="text-center text-gray-500 py-4">Loading notes...</div>
        ) : notes.length > 0 ? (
          notes.map((note) => (
            <div
              key={note.id}
              className="bg-white border rounded shadow-sm flex flex-col"
            >
              <div className="p-2 border-b flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gray-500 text-white text-xs flex items-center justify-center">
                    {(note.createdByName?.[0] ?? "?").toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-800">
                    {note.createdByName}
                  </span>
                </div>

                <div className="flex space-x-1">
                  <Button
                    type="button"
                    onClick={() => handleEdit(note)}
                    className="bg-transparent hover:bg-gray-100 p-1"
                  >
                    <EditIcon fontSize="small" className="text-blue-600" />
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setDeleteNoteId(note.id)}
                    className="bg-transparent hover:bg-gray-100 p-1"
                  >
                    <DeleteIcon fontSize="small" className="text-red-600" />
                  </Button>
                </div>
              </div>
              <div className="p-2 text-sm text-gray-700 whitespace-pre-wrap min-h-8">
                {note.description}
              </div>
              <div className="px-2 py-1 border-t bg-gray-50 text-xs text-gray-500">
                {new Date(note.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-4">No notes yet.</div>
        )}
      </div>

      <FormConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteNoteId(null)}
        onConfirm={confirmDelete}
        mode="delete"
      />
    </div>
  );
};

export default NoteForm;
