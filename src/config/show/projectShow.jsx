import Tabs from "@/components/Tabs";
import { useEntity } from "@/hooks/useEntity";

const projectShow = {
  getActionItems: ({ entity, id, item, model }) => [
    {
      label: "Modify Milestone",
      onClick: () =>
        (window.location.href = `/milestones/create?projectId=${id}`),
    },
    {
      label: "Modify Task",
      onClick: () => (window.location.href = `/tasks/create?projectId=${id}`),
    },
    {
      label: "Modify Budget",
      onClick: () => (window.location.href = `/budgets/create?model=${model}&modelId=${id}`),
    },
  ],
  getTabContent: ({ entity, id, item }) => [],
  getBottomBox: ({ entity, id, item }) => {
    const milestone = useEntity("milestones", undefined, {
      projectId: item?.id,
    });

    const task = useEntity("tasks", undefined, {
      "milestone.projectId": item?.id,
    });

    return (
      <div className="h-full">
        <Tabs tabs={[{ label: "Milestones", content: milestone.Table }, { label: "Tasks", content: task.Table }]} />
      </div>
    );
  },
};

export default projectShow;
