import React from "react";
import { useEntityAndId } from "@/hooks/useEntityAndId";
import { useEntity } from "@/hooks/useEntity";
import ShowTemplate from "@/components/templates/ShowTemplate";
import showConfig from "@/config/show/index";
import EntityCard from "@/components/cards/EntityCard";
import NoteForm from "@/components/forms/NoteForm";
import FileForm from "@/components/forms/FileForm";
import StageForm from "@/components/forms/StageForm";
import Modal from "@/components/Modal";
import StageCard from "@/components/cards/StageCard";

export default function ShowPage() {
  const { entity, id } = useEntityAndId();
  const { config, initialData, viewFields } = useEntity(entity, id);
  const show = showConfig[entity] || null;

  const defaultActionItems = [
    {
      label: `Edit ${config?.title}`,
      onClick: () => (window.location.href = `/${entity}/edit/${id}`),
    },
    {
      label: "Update Stage",
      render: ({ close }) => (
        <Modal isOpen onClose={close}>
          <StageForm onSuccess={close} model={config?.model} modelId={id} />
        </Modal>
      ),
    },
  ];

  const middleBox =
    show?.getMiddleBox?.({ entity, id, item: initialData }) ??
    (initialData?.stageName ? (
      <StageCard model={config?.model} modelId={id} />
    ) : (
      <div className="flex items-center justify-center h-full text-sm text-gray-400">
        Empty
      </div>
    ));

  const bottomBox = show?.getBottomBox ? (
    show.getBottomBox({ entity, id, item: initialData })
  ) : (
    <div className="flex items-center justify-center h-full text-sm text-gray-400">
      Empty
    </div>
  );

  const defaultTabContent = {
    label: "Data",
    content: !initialData ? (
      <div className="p-1">Loading...</div>
    ) : (
      <div className="flex flex-col md:flex-row gap-1 h-[calc(100vh-200px)]">
        {/* Left Side: 2/3 */}
        <div className="w-full md:w-2/3 flex flex-col gap-1 h-full">
          {/* Top Half */}
          <div className="flex flex-col md:flex-row gap-1 h-1/2">
            <div className="w-full md:w-1/2 border-2 rounded-md p-1 h-full">
              <EntityCard item={initialData} card={viewFields || []} />
            </div>
            <div className="w-full md:w-1/2 border-2 rounded-md p-1 h-full">
              {middleBox}
            </div>
          </div>

          {/* Bottom Half */}
          <div className="border-2 rounded-md p-1 h-1/2">{bottomBox}</div>
        </div>

        {/* Right Side: 1/3 */}
        <div className="w-full md:w-1/3 flex flex-col gap-1 h-full">
          <div className="h-1/4 border-2 rounded-md p-1 overflow-auto">
            <FileForm model={config?.model} modelId={id} />
          </div>
          <div className="h-3/4 border-2 rounded-md p-1 overflow-auto">
            <NoteForm model={config?.model} modelId={id} />
          </div>
        </div>
      </div>
    ),
  };

  const actionItems = show?.getActionItems
    ? [
        ...defaultActionItems,
        ...show.getActionItems({ entity, id, item: initialData, model: config?.model }),
      ]
    : defaultActionItems;

  const tabContent = show?.getTabContent
    ? [
        ...show.getTabContent({ entity, id, item: initialData }),
        defaultTabContent,
      ]
    : [defaultTabContent];

  return (
    <ShowTemplate
      entity={entity}
      id={id}
      actionItems={actionItems}
      tabContent={tabContent}
    />
  );
}
