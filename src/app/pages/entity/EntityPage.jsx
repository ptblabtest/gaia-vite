import { useParams } from "react-router-dom";
import { useEntity } from "@/hooks/useEntity";
import EntityTemplate from "@/components/templates/EntityTemplate";
import ActionButton from "@/components/buttons/ActionButton";

export default function EntityPage() {
  const { entity } = useParams();
  const { config, isLoading } = useEntity(entity);

  if (!entity || isLoading || !config) {
    return <div className="p-4">Loading...</div>;
  }

  const createAction = {
    label: `Create ${config?.label || entity}`,
    onClick: () => (window.location.href = `/${entity}/create`)
  };

  const headerChildren = (
    <div className="flex gap-2">
      <ActionButton title="Export" actions={[createAction]} />
      <ActionButton title="Import" actions={[createAction]} />
    </div>
  );

  return (
    <EntityTemplate
      title={config?.title || entity}
      entityKeys={[entity]}
      headerChildren={headerChildren}
    />
  );
}
