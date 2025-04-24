import { toast } from "sonner";
import Tabs from "@/components/Tabs";
import { useEntity } from "@/hooks/useEntity";
import Modal from "@/components/Modal";
import PartialForm from "@/components/forms/PartialForm";

const opportunityShow = {
  getActionItems: ({ entity, id, item }) => [
    {
      label: "Create Quote",
      onClick: () => {
        if (item?.approvedDate) {
          window.location.href = `/quotes/create?opportunityId=${id}&company=${item?.company}&baseAmount=${item?.amount}&productId=${item?.productId}&title=${item?.title}`;
        } else {
          toast.error("Approve Opportunity before Create Quote");
        }
      },
    },
    {
      label: "Approve Opportunity",
      render: ({ close }) => (
        <Modal isOpen onClose={close} className="max-w-md">
          <h2 className="text-xl font-semibold mb-4">Approve Quote</h2>
          <PartialForm
            fields={[
              { item: "approvedDate", label: "Approved Date", type: "date" },
            ]}
            entityName="opportunities"
            id={id}
            initialData={item}
            onSuccess={close}
          />
        </Modal>
      ),
    },
  ],
  getBottomBox: ({ entity, id, item }) => {
    const quote = useEntity("quotes", undefined, {
      opportunityId: item?.id,
    });
    const lead = useEntity("leads", item?.leadId);
    const eventEntity = useEntity("events", undefined, { quoteId: item?.id });

    return (
      <div className="h-full">
        <Tabs
          tabs={[
            { label: "Quotes", content: quote.Table },
            { label: "Leads", content: lead.Table },
            { label: "Events", content: eventEntity.Table },
          ]}
        />
      </div>
    );
  },
  getTabContent: ({ entity, id, item }) => [],
};

export default opportunityShow;
