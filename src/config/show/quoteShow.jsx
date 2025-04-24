import React from "react";
import { toast } from "sonner";
import Modal from "@/components/Modal";
import PartialForm from "@/components/forms/PartialForm";
import Tabs from "@/components/Tabs";
import { useEntity } from "@/hooks/useEntity";

const quoteShow = {
  getActionItems: ({ entity, id, item }) => [
    {
      label: "Create Contract",
      onClick: () => {
        if (item?.approvedDate) {
          window.location.href = `/contracts/create?quoteId=${item?.id}&productId=${item?.productId}&title=${item?.title}&baseAmount=${item?.amount}`;
        } else {
          toast.error("Approve Quote before Create Contract");
        }
      },
    },
    {
      label: "Quote Released",
      render: ({ close }) => (
        <Modal isOpen onClose={close} className="max-w-md">
          <h2 className="text-xl font-semibold mb-4">Set Release Date</h2>
          <PartialForm
            fields={[
              { item: "releasedDate", label: "Release Date", type: "date" },
            ]}
            entityName="quotes"
            id={id}
            initialData={item}
            onSuccess={close}
          />
        </Modal>
      ),
    },
    {
      label: "Quote Expired",
      render: ({ close }) => (
        <Modal isOpen onClose={close} className="max-w-md">
          <h2 className="text-xl font-semibold mb-4">Set Expired Date</h2>
          <PartialForm
            fields={[
              { item: "expiredDate", label: "Expired Date", type: "date" },
            ]}
            entityName="quotes"
            id={id}
            initialData={item}
            onSuccess={close}
          />
        </Modal>
      ),
    },
    {
      label: "Quote Approved",
      render: ({ close }) => (
        <Modal isOpen onClose={close} className="max-w-md">
          <h2 className="text-xl font-semibold mb-4">Approve Quote</h2>
          <PartialForm
            fields={[
              { item: "approvedDate", label: "Approved Date", type: "date" },
            ]}
            entityName="quotes"
            id={id}
            initialData={item}
            onSuccess={close}
          />
        </Modal>
      ),
    },
  ],
  getTabContent: ({ entity, id, item }) => [],
  getBottomBox: ({ entity, id, item }) => {
    const contractEntity = useEntity("contracts", undefined, {
      quoteId: item?.id,
    });
    const opportunityEntity = useEntity("opportunities", item?.opportunityId);
    const eventEntity = useEntity("events", undefined, { quoteId: item?.id });

    return (
      <div className="h-full">
        <Tabs
          tabs={[
            { label: "Contracts", content: contractEntity.Table },
            { label: "Opportunities", content: opportunityEntity.Table },
            { label: "Events", content: eventEntity.Table },
          ]}
        />
      </div>
    );
  },
};

export default quoteShow;
