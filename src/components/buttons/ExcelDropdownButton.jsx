import React, { useRef } from "react";
import ActionButton from "@/components/buttons/ActionButton";
import axios from "@/lib/axios";
import { toast } from "sonner";

const apiUrl = import.meta.env.VITE_API_URL;

const ExcelDropdownButton = ({ entity }) => {
  const fileInputRef = useRef();

  const handleExport = async () => {
    try {
      const response = await axios.get(`${apiUrl}/export/${entity}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${entity}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error("Failed to export Excel");
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/export-template/${entity}`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${entity}-template.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error("Failed to download template");
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImport = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post(`${apiUrl}/import/${entity}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Import successful");
    } catch (error) {
      toast.error("Failed to import Excel");
    }
  };

  const actions = [
    { label: "Export Excel", onClick: handleExport },
    { label: "Download Template", onClick: handleDownloadTemplate },
    { label: "Import Excel", onClick: handleImportClick },
  ];

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx"
        onChange={handleImport}
        className="hidden"
      />
      <ActionButton title="Excel" actions={actions} />
    </>
  );
};

export default ExcelDropdownButton;
