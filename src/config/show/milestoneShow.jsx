const milestoneShow = {
  getActionItems: ({ entity, id, item }) => [
    {
      label: 'Milestone Done',
      onClick: () => {}
    },
    {
      label: 'Create AR',
      onClick: () => {}
    },
  ],
  getTabContent: ({ entity, id, item }) => [
    { label: "ReceivableTable", content: <div>ReceivableTable content</div> }
  ],
};

export default milestoneShow;
