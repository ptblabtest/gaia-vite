import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import FolderIcon from '@mui/icons-material/Folder';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import BuildIcon from '@mui/icons-material/Build';
import PeopleIcon from '@mui/icons-material/People';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CategoryIcon from '@mui/icons-material/Category';

const sidebarConfig = [
  { path: "/dashboard", label: "Dashboard", icon: <HomeIcon /> },
  { path: "/events", label: "Events", icon: <EventIcon /> },
  { path: "/funds", label: "FPDP", icon: <RequestPageIcon /> },
  { path: "/files", label: "Files", icon: <FolderIcon /> },
  { path: "/sales", label: "Sales", icon: <BusinessCenterIcon /> },
  { path: "/operations", label: "Operation", icon: <BuildIcon /> },
  { path: "/contacts", label: "Contacts", icon: <PeopleIcon /> },
  { path: "/products", label: "Solutions", icon: <StorefrontIcon /> },
  { path: "/accounts", label: "Chart of Accounts", icon: <AccountBalanceIcon /> },
  { path: "/admin", label: "Administrator", icon: <AdminPanelSettingsIcon /> },
  { path: "/users", label: "Users", icon: <PeopleIcon /> },
  { path: "/templates", label: "Templates", icon: <CategoryIcon /> },
  { path: "/ar", label: "Account Receivables", icon: <BusinessCenterIcon /> }
];

export default sidebarConfig;

