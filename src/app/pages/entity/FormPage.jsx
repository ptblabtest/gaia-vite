import Breadcrumbs from "@/components/Breadcrumbs";
import BaseForm from "@/components/forms/BaseForm";
import { useEntityAndId } from "@/hooks/useEntityAndId";
import { useEntity } from "@/hooks/useEntity";
import formConfig from "@/config/forms/index";
import MilestoneForm from "@/components/forms/MilestoneForm";
import TaskForm from "@/components/forms/TaskForm";
import BudgetForm from "@/components/forms/BudgetForm";
import InvoiceForm from "@/components/forms/InvoiceForm";
import PurchaseForm from "@/components/forms/PurchaseForm";
import FundForm from "@/components/forms/FundForm";
import ExpenseForm from "@/components/forms/ExpenseForm";
import PaymentForm from "@/components/forms/PaymentForm";

export default function FormPage({ onSuccess = null }) {
  const { entity, id } = useEntityAndId();

  const { config, formFields, initialData } = useEntity(entity, id, {
    mode: "form",
  });

  const handleFormSuccess = (response) => {
    const newId = response?.data?.id;

    if (entity) {
      if (id) {
        window.location.href = `/${entity}/${id}`;
      } else if (newId) {
        window.location.href = `/${entity}/${newId}`;
      } else {
        window.location.href = `/${entity}`;
      }
    }
    
    if (typeof onSuccess === "function") {
      onSuccess(response);
    }
  };

  if (!formFields) {
    return <div className="p-4">Loading form fields...</div>;
  }

  const breadcrumbLinks = [
    { label: "Home", href: "/" },
    { label: config?.title ?? entity, href: `/${entity}` },
    {
      label: id
        ? `Edit ${config?.title ?? entity} - ${
            Object.entries(initialData || {}).find(
              ([key]) => key !== "id" && initialData[key]
            )?.[1] || ""
          }`
        : `Create ${config?.title ?? entity}`,
    },
  ];

  let formContent;
  if (entity === "milestones") {
    formContent = (
      <div className="px-5 py-1 flex justify-center">
        <div className="w-full border rounded-lg py-2 px-4 bg-white shadow-sm">
          <MilestoneForm
            entity={entity}
            entityId={id}
            onSuccess={handleFormSuccess}
          />
        </div>
      </div>
    );
  } else if (entity === "expenses") {
    formContent = (
      <div className="px-5 py-1 flex justify-center">
        <div className="max-w-6xl border rounded-lg py-2 px-4 bg-white shadow-sm">
          <ExpenseForm
            entity={entity}
            entityId={id}
            onSuccess={handleFormSuccess}
          />
        </div>
      </div>
    );
  } else if (entity === "payments") {
    formContent = (
      <div className="px-5 py-1 flex justify-center">
        <div className="max-w-7xl border rounded-lg py-2 px-4 bg-white shadow-sm">
          <PaymentForm
            entity={entity}
            entityId={id}
            onSuccess={handleFormSuccess}
          />
        </div>
      </div>
    );
  } else if (entity === "tasks") {
    formContent = (
      <div className="px-5 py-1 flex justify-center">
        <div className="w-full border rounded-lg py-2 px-4 bg-white shadow-sm">
          <TaskForm
            entity={entity}
            entityId={id}
            onSuccess={handleFormSuccess}
          />
        </div>
      </div>
    );
  } else if (entity === "purchases") {
    formContent = (
      <div className="px-5 py-1 flex justify-center">
        <div className="w-full border rounded-lg py-2 px-4 bg-white shadow-sm">
          <PurchaseForm
            entity={entity}
            entityId={id}
            onSuccess={handleFormSuccess}
          />
        </div>
      </div>
    );
  } else if (entity === "budgets") {
    formContent = (
      <div className="px-5 py-1 flex justify-center">
        <div className="w-full border rounded-lg py-2 px-4 bg-white shadow-sm">
          <BudgetForm
            entity={entity}
            entityId={id}
            onSuccess={handleFormSuccess}
          />
        </div>
      </div>
    );
  } else if (entity === "funds") {
    formContent = (
      <div className="px-5 py-1 flex justify-center">
        <div className="w-full border rounded-lg py-2 px-4 bg-white shadow-sm">
          <FundForm
            entity={entity}
            entityId={id}
            onSuccess={handleFormSuccess}
          />
        </div>
      </div>
    );
  } else if (entity === "invoices") {
    formContent = (
      <div className="px-5 py-1 flex justify-center">
        <div className="w-full max-w-4xl border rounded-lg py-2 px-4 bg-white shadow-sm">
          <InvoiceForm
            entity={entity}
            entityId={id}
            onSuccess={handleFormSuccess}
          />
        </div>
      </div>
    );
  } else {
    formContent = (
      <div className="px-5 py-1 flex justify-center">
        <div className="w-full border rounded-lg py-2 px-4 bg-white shadow-sm">
          <BaseForm
            fields={formFields}
            entityName={entity}
            mode={id ? "update" : "create"}
            initialData={initialData}
            id={id}
            onSuccess={handleFormSuccess}
            customRender={formConfig[entity] || null}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex sticky h-12 top-0 z-10 bg-white p-1 justify-between items-center border-b">
        <Breadcrumbs links={breadcrumbLinks} />
      </div>
      {formContent}
    </div>
  );
}
