import React from "react";
import { useEntity } from "@/hooks/useEntity";
import SectionTitle from "@/components/SectionTitle";

export default function StageCard({ model, modelId }) {
  const queryParams =
    model && modelId
      ? {
          model,
          modelId,
          orderBy: "createdAt:desc",
        }
      : {};

  const { data, loading } = useEntity("stages", null, queryParams);

  if (loading) {
    return <div className="p-2 text-sm text-gray-400">Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div className="p-2 text-sm text-gray-400">No Stage History</div>;
  }

  return (
    <div className="flex flex-col items-start gap-1 h-full overflow-auto">
      <div className="mb-1 border-b w-full">
        <SectionTitle title="Stage History" />
      </div>

      {data.map((stage) => (
        <div
          key={stage.id}
          className="w-full border p-2 rounded-md shadow-sm text-sm"
        >
          <div className="font-semibold text-left">{stage.stageName}</div>
          <div className="text-gray-500 text-left">
            {new Date(stage.createdAt).toLocaleString()}
          </div>
          {stage.comment && (
            <div className="mt-1 text-gray-700 text-left">{stage.comment}</div>
          )}
          <div className="mt-1 text-gray-400 text-xs text-left">
            By {stage.createdByName}
          </div>
        </div>
      ))}
    </div>
  );
}
