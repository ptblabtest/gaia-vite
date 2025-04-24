import PartialForm from "@/components/forms/PartialForm";
import Modal from "@/components/Modal";
import Tabs from "@/components/Tabs";
import { useEntity } from "@/hooks/useEntity";

const taskShow = {
  getActionItems: ({ entity, id, item, model }) => [
    {
      label: `Create Cost Sheet`,
      onClick: () =>
        (window.location.href = `/budgets/create?model=${model}&modelId=${id}`),
    },
    {
      label: "Task Done",
      render: ({ close }) => (
        <Modal isOpen onClose={close} className="max-w-md">
          <h2 className="text-xl font-semibold mb-4">Task Done</h2>
          <PartialForm
            fields={[
              { item: "actualEndDate", label: "Actual End Date", type: "date" },
            ]}
            entityName="tasks"
            id={id}
            initialData={item}
            onSuccess={close}
          />
        </Modal>
      ),
    },
    {
      label: "Update Progress",
      render: ({ close }) => (
        <Modal isOpen onClose={close} className="max-w-md">
          <h2 className="text-xl font-semibold mb-4">Update Progress</h2>
          <PartialForm
            fields={[{ item: "progress", label: "Progress", type: "percent" }]}
            entityName="tasks"
            id={id}
            initialData={item}
            onSuccess={close}
          />
        </Modal>
      ),
    },
    {
      label: "Create Activity",
      onClick: () => {},
    },
    {
      label: "Delete Task",
      onClick: () => {},
    },
  ],
  getBottomBox: ({ entity, id, item, model }) => {
    const queryParams = entity && id ? { model: model, modelId: id } : {};
    const budget = useEntity("budgets", null, queryParams);

    return (
      <div className="h-full">
        <Tabs tabs={[{ label: "Budgets", content: budget.Table }]} />
      </div>
    );
  },

  getTabContent: ({ entity, id, item }) => [
    { label: "BudgetTable", content: <div>BudgetTable content</div> },
    { label: "EventTable", content: <div>EventTable content</div> },
    { label: "CompareTable", content: <div>CompareTable content</div> },
    { label: "ActivitieTable", content: <div>ActivitieTable content</div> },
  ],
};

export default taskShow;
