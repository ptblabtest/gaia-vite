import Breadcrumbs from "@/components/Breadcrumbs";
import ActionButton from "@/components/buttons/ActionButton";

export default function EntityTemplate({
  breadcrumbLinks,
  actionItems,
  children,
  extraButtons = null,
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 flex h-12 items-center justify-between bg-white p-1 border-b z-10">
        <Breadcrumbs links={breadcrumbLinks} />
        <div className="flex items-center">
          {extraButtons}
          {actionItems.length > 0 && <ActionButton actions={actionItems} />}
        </div>
      </div>
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}
