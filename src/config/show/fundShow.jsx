import { toast } from "sonner";
import PartialForm from "@/components/forms/PartialForm";
import Modal from "@/components/Modal";

const fundShow = {
  getActionItems: ({ entity, id, item, model }) => [
    {
      label: "Approve FPDP",
      render: ({ close }) => (
        <Modal isOpen onClose={close} className="max-w-md">
          <h2 className="text-xl font-semibold mb-4">Approve FPDP</h2>
          <PartialForm
            fields={[
              { item: "approvedDate", label: "Void Date", type: "date" },
            ]}
            entityName="funds"
            id={id}
            initialData={item}
            onSuccess={close}
          />
        </Modal>
      ),
    },
    {
      label: "Payment Control",
      onClick: () => {
        if (item?.approvedDate) {
          window.location.href = `/payments/create?model=${model}&modelId=${id}`;
        } else {
          toast.error("Approve FPDP before Add Payment");
        }
      },
    },    
    {
      label: "Create Expense",
      onClick: () => {
        if (item?.approvedDate) {
          window.location.href = `/expenses/create?fundId=${id}`;
        } else {
          toast.error("Approve FPDP before Create Expense");
        }
      },
    },
    {
      label: "FPDP Close",
      render: ({ close }) => (
        <Modal isOpen onClose={close} className="max-w-md">
          <h2 className="text-xl font-semibold mb-4">Close FPDP</h2>
          <PartialForm
            fields={[
              { item: "closedDate", label: "Closed Date", type: "date" },
            ]}
            entityName="funds"
            id={id}
            initialData={item}
            onSuccess={close}
          />
        </Modal>
      ),
    },
    {
      label: "Void Date",
      render: ({ close }) => (
        <Modal isOpen onClose={close} className="max-w-md">
          <h2 className="text-xl font-semibold mb-4">Void FPDP</h2>
          <PartialForm
            fields={[{ item: "voidDate", label: "Void Date", type: "date" }]}
            entityName="funds"
            id={id}
            initialData={item}
            onSuccess={close}
          />
        </Modal>
      ),
    },
  ],
  getTabContent: ({ entity, id, item }) => [
    { label: "ExpenseTable", content: <div>ExpenseTable content</div> },
    { label: "PaymentTable", content: <div>PaymentTable content</div> },
    { label: "CompareTable", content: <div>CompareTable content</div> },
  ],
};

export default fundShow;
