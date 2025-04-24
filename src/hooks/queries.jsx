import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const apiUrl = import.meta.env.VITE_API_URL;

const useEntityData = (entity, params = {}) => {
  const mergedParams = {
    orderBy: params.orderBy || "createdAt:desc",
    ...params,
  };

  return useQuery({
    queryKey: [entity, mergedParams],
    queryFn: async () => {
      const response = await axios.get(`${apiUrl}/${entity}`, { params: mergedParams });
      return response.data?.data || response.data || [];
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });
};


const useEntityDataId = (entity, id = null, params = {}) => {
  return useQuery({
    queryKey: [entity, id, params],
    queryFn: async () => {
      const response = await axios.get(`${apiUrl}/${entity}/${id}`, { params });
      return response.data?.data || response.data || null;
    },
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
};

const useConfig = ({ type, entity }) => {
  return useQuery({
    queryKey: ["config", type, entity],
    queryFn: async () => {
      const response = await axios.get(`${apiUrl}/config`, {
        params: { type, model: entity },
      });

      const data = response.data || [];

      switch (type) {
        case "table":
          return data.map((field) => ({
            field: field.item,
            headerName: field.label,
            type: field.type,
          }));

        case "form":
          return data.map((field) => ({
            item: field.item,
            label: field.label,
            type: field.type,
            validation: field.validation,
            defaultValue: field.defaultValue,
            placeholder: field.placeholder,
            uppercase: field.uppercase,
            creatable: field.creatable,
            disabled: field.disabled,
            options: field.options,
          }));

        case "view":
        default:
          return data;
      }
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

const useSelectOptions = (field, { enabled = true } = {}) => {
  const key = field?.item;
  const endpoint = field?.optionEndpoint || `${apiUrl}/select/${key}`;

  return useQuery({
    queryKey: ["select", endpoint],
    queryFn: async () => {
      const response = await axios.get(endpoint);
      return response.data || [];
    },
    enabled: enabled && !!endpoint && !field.options,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

export { useEntityData, useEntityDataId, useConfig, useSelectOptions };
