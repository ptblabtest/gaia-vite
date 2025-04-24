import { useState, useEffect } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Button from "@/components/Button";

const SidebarToggleButton = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    window.dispatchEvent(
      new CustomEvent("sidebarToggle", { detail: { isOpen: newState } })
    );
  };

  useEffect(() => {
    const handleSidebarToggle = (e) => {
      setIsOpen(e.detail.isOpen);
    };
    window.addEventListener("sidebarToggle", handleSidebarToggle);
    return () => window.removeEventListener("sidebarToggle", handleSidebarToggle);
  }, []);

  return (
    <Button
      type="button"
      onClick={toggleSidebar}
      className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full text-white"
    >
      {isOpen ? <ChevronLeftIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
    </Button>
  );
};

export default SidebarToggleButton;
