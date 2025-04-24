import { useParams, useSearchParams } from "react-router-dom";

export function useEntityAndId(staticEntity, staticId) {
  const { entity: paramEntity, id: paramId } = useParams();
  const [searchParams] = useSearchParams();

  const entity = staticEntity || paramEntity;
  const id = staticId || searchParams.get("id") || paramId;

  return { entity, id };
}
