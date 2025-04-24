import React, { useState } from "react";
import EntityTemplate from "@/components/templates/EntityTemplate";
import Tabs from "@/components/Tabs";
import { useEntity } from "@/hooks/useEntity";
import { sectionConfig } from "@/config/sectionConfig";
import ExcelDropdownButton from "@/components/buttons/ExcelDropdownButton";

export default function SalesPage() {
  const { title, entityKeys } = sectionConfig.sales;
  const [activeTab, setActiveTab] = useState(0);
  const activeEntity = entityKeys[activeTab];

  const entities = entityKeys.map((key) => {
    const { config, isLoading, error, Table, createUrl } = useEntity(key);
    return { key, config, isLoading, error, Table, createUrl };
  });

  const breadcrumbLinks = [
    { label: "Home", href: "/" },
    { label: title, href: "/sales" },
  ];

  const actionItems = entities.map((entity) => ({
    label: `New ${entity.config.title}`,
    onClick: () => (window.location.href = entity.createUrl),
  }));

  const tabs = entities.map(({ key, config: { title }, isLoading, error, Table }) => ({
    label: title,
    content: isLoading ? (
      <div className="p-4 text-center text-gray-400">Loading…</div>
    ) : error ? (
      <div className="p-4 text-center text-red-500">Error loading data</div>
    ) : (
      <div className="h-full">{Table}</div>
    ),
  }));

  return (
    <EntityTemplate
      breadcrumbLinks={breadcrumbLinks}
      actionItems={actionItems}
      extraButtons={<ExcelDropdownButton entity={activeEntity} />}
    >
      <Tabs
        tabs={tabs}
        activeIndex={activeTab}
        onChange={(index) => setActiveTab(index)}
      />
    </EntityTemplate>
  );
}
