import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const apiUrl = import.meta.env.VITE_API_URL;

const useMutateUrl = (entity, params = {}) => {
  const queryClient = useQueryClient();

  const withParams = (url) => {
    const search = new URLSearchParams(params).toString();
    return search ? `${url}?${search}` : url;
  };

  const createMutation = useMutation({
    mutationFn: async (item) => {
      const url = withParams(`${apiUrl}/${entity}`);
      const response = await axios.post(url, item);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [entity] });
      toast.success("Form submitted successfully!");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "An error occurred while creating the record."
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, item }) => {
      const response = await axios.patch(`${apiUrl}/${entity}/${id}`, item);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [entity] });
      toast.success("Record updated successfully!");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "An error occurred while updating the record."
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${apiUrl}/${entity}/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [entity] });
      toast.success("Record deleted successfully!");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "An error occurred while deleting the record."
      );
    },
  });

  const bulkCreateMutation = useMutation({
    mutationFn: async (items) => {
      const url = withParams(`${apiUrl}/${entity}/bulk-create`);
      const response = await axios.post(url, items);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [entity] });
      toast.success("Record created successfully!");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "An error occurred while created the record."
      );
    },
  });

  const bulkUpdateMutation = useMutation({
    mutationFn: async (items) => {
      const response = await axios.patch(
        `${apiUrl}/${entity}/bulk-update`,
        items
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [entity] });
      toast.success("Record updated successfully!");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "An error occurred while updated the record."
      );
    },
  });

  return {
    create: createMutation,
    update: updateMutation,
    remove: deleteMutation,
    createMultiple: bulkCreateMutation,
    updateMultiple: bulkUpdateMutation,
  };
};

export default useMutateUrl;
