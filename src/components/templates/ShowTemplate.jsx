import { useEntity } from "@/hooks/useEntity";
import Breadcrumbs from "@/components/Breadcrumbs";
import Tabs from "@/components/Tabs";
import ActionButton from "@/components/buttons/ActionButton";
import { sectionConfig } from "@/config/sectionConfig";
import { useState } from "react";

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function ShowTemplate({
  entity,
  id,
  headerChildren = null,
  breadcrumbLinks: customBreadcrumbs,
  actionItems = [],
  tabContent = [],
  children = null,
}) {
  const { config, initialData } = useEntity(entity, id);
  const [activeTab, setActiveTab] = useState(0);

  const sectionEntry = Object.entries(sectionConfig).find(([, conf]) =>
    conf.entityKeys.includes(entity)
  );
  const [sectionKey] = sectionEntry || [];

  const defaultBreadcrumbs = [
    { label: "Home", href: "/" },
    ...(sectionKey
      ? [{ label: capitalize(sectionKey), href: `/${sectionKey}` }]
      : []),
    { label: config?.title || capitalize(entity), href: `/${entity}` },
    {
      label: `View ${config?.title || capitalize(entity)} - ${
        Object.entries(initialData || {}).find(
          ([key]) => key !== "id" && initialData?.[key]
        )?.[1] || ""
      }`,
    },
  ];

  const breadcrumbs = customBreadcrumbs || defaultBreadcrumbs;

  return (
    <div className="flex flex-col h-full">
      <div className="flex sticky h-12 top-0 bg-white p-1 justify-between items-center border-b z-10">
        <Breadcrumbs links={breadcrumbs} />
        <div className="flex items-center">
          {headerChildren}
          {actionItems.length > 0 && (
            <ActionButton title="" actions={actionItems} />
          )}
        </div>
      </div>
      {children && <div className="p-1">{children}</div>}
      <div className="h-full bg-white">
        <Tabs
          tabs={tabContent}
          activeIndex={activeTab}
          setActiveIndex={setActiveTab}
        />
      </div>
    </div>
  );
}
