import React from "react";
import EntityTemplate from "@/components/templates/EntityTemplate";
import Tabs from "@/components/Tabs";
import { useEntity } from "@/hooks/useEntity";
import { sectionConfig } from "@/config/sectionConfig";

export default function UsersPage() {
  const { title, entityKeys } = sectionConfig.users;

  const entities = entityKeys.map((key) => {
    const { config, isLoading, error, Table, createUrl } = useEntity(key);
    return { key, config, isLoading, error, Table, createUrl };
  });

  const breadcrumbLinks = [
    { label: "Home", href: "/" },
    { label: title, href: "/users" },
  ];

  const actionItems = entities.map((entity) => ({
    label: `New ${entity.config.title}`,
    onClick: () => (window.location.href = entity.createUrl),
  }));

  const tabs = entities.map(
    ({ config: { title }, isLoading, error, Table }) => ({
      label: title,
      content: (
        <div className="overflow-x-auto h-full">
          {isLoading ? (
            <div className="p-4 text-center text-gray-400">Loading…</div>
          ) : error ? (
            <div className="p-4 text-center text-red-500">Error loading data</div>
          ) : (
            <div className="h-full">{Table}</div>
          )}
        </div>
      ),
    })
  );

  return (
    <EntityTemplate
      breadcrumbLinks={breadcrumbLinks}
      actionItems={actionItems}
    >
      <Tabs tabs={tabs} />
    </EntityTemplate>
  );
}
