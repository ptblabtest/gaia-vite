import { useEntityData, useEntityDataId } from "@/hooks/queries";
import { entityConfig } from "@/config/entities";
import Table from "@/components/Table";

export function useEntity(entity, id, params = {}) {
  const configItem = entityConfig[entity];
  
  const listCache = useEntityData(entity, params);
  const detailCache = useEntityDataId(entity, id, params);

  return {
    config: configItem,
    columns: configItem?.columns,
    formFields: configItem?.form,
    viewFields: configItem?.card,
    data: listCache.data || [],
    isLoading: listCache.isLoading,
    error: listCache.error,
    initialData: detailCache.data,
    createUrl: `/${entity}/create`,
    updateUrl: `/${entity}/edit/${id}`,
    Table: configItem?.columns ? (
      <Table
        items={listCache.data}
        columns={configItem.columns}
        isLoading={listCache.isLoading}
        error={listCache.error}
        showUrl={`/${entity}/:id`}
        updateUrl={`/${entity}/:id/edit`}
      />
    ) : null,
  };
}
