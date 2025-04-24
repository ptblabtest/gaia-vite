import { toast } from "sonner";
import PartialForm from "@/components/forms/PartialForm";
import Modal from "@/components/Modal";
import Tabs from "@/components/Tabs";
import { useEntity } from "@/hooks/useEntity";

const budgetShow = {
  getActionItems: ({ entity, id, item, model }) => [
    {
      label: "Approve Budget",
      render: ({ close }) => (
        <Modal isOpen onClose={close} className="max-w-md">
          <h2 className="text-xl font-semibold mb-4">Approve Quote</h2>
          <PartialForm
            fields={[
              { item: "approvedDate", label: "Approved Date", type: "date" },
            ]}
            entityName="budgets"
            id={id}
            initialData={item}
            onSuccess={close}
          />
        </Modal>
      ),
    },
    {
      label: "Create PO",
      onClick: () => {
        if (item?.approvedDate) {
          window.location.href = `/purchases/create?model=${model}&modelId=${id}`;
        } else {
          toast.error("Approve Opportunity before Create Quote");
        }
      },
    },
    {
      label: "Create FPDP",
      onClick: () => {
        if (item?.approvedDate) {
          window.location.href = `/funds/create?budgetId=${id}`;
        } else {
          toast.error("Approve Opportunity before Create Quote");
        }
      },
    },
  ],
  getTabContent: ({ entity, id, item }) => [],
  getMiddleBox: ({ entity, id, item }) => {},
  getBottomBox: ({ entity, id, item, model }) => {
    const queryParams = entity && id ? { model: model, modelId: id } : {};
    const purchase = useEntity("purchases", null, queryParams);
    const fund = useEntity("funds", null, queryParams);

    return (
      <div className="h-full">
        <Tabs
          tabs={[
            { label: "PO", content: purchase.Table },
            { label: "FPDP", content: fund.Table },
          ]}
        />
      </div>
    );
  },
};

export default budgetShow;
