import { toast } from "sonner"; 
import PartialForm from "@/components/forms/PartialForm";
import Modal from "@/components/Modal";
import Tabs from "@/components/Tabs";
import { useEntity } from "@/hooks/useEntity";

const leadShow = {
  getActionItems: ({ entity, id, item }) => [
    {
      label: "Create Opportunity",
      onClick: () => {
        if (item?.approvedDate) {
          window.location.href = `/opportunities/create?leadId=${id}&company=${item?.companyName}`;
        } else {
          toast.error("Approve Lead before Create Opportunity"); 
        }
      },
    },
    {
      label: "Approve Lead",
      render: ({ close }) => (
        <Modal isOpen onClose={close} className="max-w-md">
          <h2 className="text-xl font-semibold mb-4">Approve Quote</h2>
          <PartialForm
            fields={[
              { item: "approvedDate", label: "Approved Date", type: "date" },
            ]}
            entityName="leads"
            id={id}
            initialData={item}
            onSuccess={close}
          />
        </Modal>
      ),
    },
  ],
  getTabContent: ({ entity, id, item }) => [],
  getMiddleBox: ({ entity, id, item }) => {
  },
  getBottomBox: ({ entity, id, item }) => {
    const opportunityEntity = useEntity("opportunities", item?.leadId);

    return (
      <div className="h-full">
        <Tabs
          tabs={[{ label: "Opportunities", content: opportunityEntity.Table }]}
        />
      </div>
    );
  },
};

export default leadShow;
