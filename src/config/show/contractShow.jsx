import PartialForm from "@/components/forms/PartialForm";
import Modal from "@/components/Modal";
import Tabs from "@/components/Tabs";
import { useEntity } from "@/hooks/useEntity";
import { toast } from "sonner";

const contractShow = {
  getActionItems: ({ entity, id, item }) => [
    {
      label: "Create Project",
      onClick: () => {
        if (item?.projectNumber || item?.projectName) {
          toast.error("Project already created");
        } else {
          window.location.href = `/projects/create?contractId=${id}`;
        }
      },
    },
    {
      label: "Sign Contract",
      render: ({ close }) => (
        <Modal isOpen onClose={close} className="max-w-md">
          <h2 className="text-xl font-semibold mb-4">Input Sign Contract Date</h2>
          <PartialForm
            fields={[
              { item: "signedDate", label: "Signed Date", type: "date" },
            ]}
            entityName="contracts"
            id={id}
            initialData={item}
            onSuccess={close}
          />
        </Modal>
      ),
    },
  ],
  getTabContent: ({ entity, id, item }) => [
  ],
  getBottomBox: ({ entity, id, item }) => {
    const project = useEntity("projects", undefined, {
      contractId: item?.id,
    });
    const quote = useEntity("quotes", item?.quoteId);

    return (
      <div className="h-full">
        <Tabs
          tabs={[{ label: "Project", content: project.Table },
            { label: "Milestones", content: <></> },
            { label: "Quote", content: quote.Table },
            
          ]}
        />
      </div>
    );
  },
};

export default contractShow;
