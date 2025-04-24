import { costTypeConfig } from "./costTypeConfig";
import { accountConfig } from "./accountConfig";
import { activityConfig } from "./activityConfig";
import { fundConfig } from "./fundConfig";
import { auditConfig } from "./auditConfig";
import { budgetConfig } from "./budgetConfig";
import { categoryConfig } from "./categoryConfig";
import { clientConfig } from "./clientConfig";
import { contractConfig } from "./contractConfig";
import { eventConfig } from "./eventConfig";
import { expenseConfig } from "./expenseConfig";
import { fileConfig } from "./fileConfig";
import { invoiceConfig } from "./invoiceConfig";
import { leadConfig } from "./leadConfig";
import { milestoneConfig } from "./milestoneConfig";
import { noteConfig } from "./noteConfig";
import { opportunityConfig } from "./opportunityConfig";
import { payableConfig } from "./payableConfig";
import { paymentConfig } from "./paymentConfig";
import { productConfig } from "./productConfig";
import { profileConfig } from "./profileConfig";
import { projectConfig } from "./projectConfig";
import { purchaseConfig } from "./purchaseConfig";
import { quoteConfig } from "./quoteConfig";
import { receivableConfig } from "./receivableConfig";
import { stageConfig } from "./stageConfig";
import { taskConfig } from "./taskConfig";
import { userConfig } from "./userConfig";
import { vendorConfig } from "./vendorConfig";
import { stageTypeConfig } from "./stagetypeConfig";
import { taxDocumentConfig } from "./taxdocumentConfig";

export const entityConfig = {
  accounts: accountConfig,
  activities: activityConfig,
  funds: fundConfig,
  audits: auditConfig,
  costTypes: costTypeConfig,
  budgets: budgetConfig,
  categories: categoryConfig,
  clients: clientConfig,
  contracts: contractConfig,
  events: eventConfig,
  expenses: expenseConfig,
  files: fileConfig,
  invoices: invoiceConfig,
  leads: leadConfig,
  milestones: milestoneConfig,
  notes: noteConfig,
  opportunities: opportunityConfig,
  payables: payableConfig,
  payments: paymentConfig,
  products: productConfig,
  profiles: profileConfig,
  projects: projectConfig,
  purchases: purchaseConfig,
  quotes: quoteConfig,
  receivables: receivableConfig,
  stages: stageConfig,
  stageTypes: stageTypeConfig,
  tasks: taskConfig,
  taxDocuments: taxDocumentConfig,
  users: userConfig,
  vendors: vendorConfig,
};
