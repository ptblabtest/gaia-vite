const receivableShow = {
  getActionItems: ({ entity, id, item }) => [
    {
      label: "Create Invoice",
      onClick: () =>
        (window.location.href = `/ar/invoices/create?receivableId=${id}`),
    },
    {
      label: "Input Payment Received",
      onClick: () =>
        (window.location.href = `/payments/create?receivableId=${id}`),
    },
    {
      label: "Document Sent",
      onClick: () => {}
    },
    {
      label: "Input Tax Document",
      onClick: () => {}
    },
  ],
  getTabContent: ({ entity, id, item }) => [
    { label: "InvoiceTable", content: <div>InvoiceTable content</div> },
    { label: "PaymentTable", content: <div>PaymentTable content</div> },
    { label: "TaxdocumentTable", content: <div>TaxdocumentTable content</div> },
    { label: "DocumentTable", content: <div>DocumentTable content</div> },
  ],
};

export default receivableShow;
