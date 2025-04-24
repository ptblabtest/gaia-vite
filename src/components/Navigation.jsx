

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ApplicationLogo from "@/components/ApplicationLogo";
import { appConfig } from "@/config/appConfig";
import Button from "@/components/Button";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useAuthStore from "@/lib/authStore";
import ActionButton from "@/components/buttons/ActionButton";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const userMenuRef = useRef(null);
  const userButtonRef = useRef(null);

  const { user, logout } = useAuthStore();

  const navLinks = [
  ];

  const handleLogout = () => logout();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }

      if (
        isUserMenuOpen &&
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, isUserMenuOpen]);

  const renderNavLinks = (isMobile = false) =>
    navLinks.map((link) => (
      <Link
        key={link.to}
        to={link.to}
        onClick={() => isMobile && setIsMenuOpen(false)}
        className={`${
          isMobile
            ? "block px-4 py-3 text-white hover:bg-blue-700"
            : "px-3 py-2 text-white hover:bg-blue-700 rounded"
        }`}
      >
        {link.label}
      </Link>
    ));

  const UserDropdown = () =>
    user && (
      <div className="relative flex items-center space-x-2">
        <Button
          ref={userButtonRef}
          onClick={() => setIsUserMenuOpen((prev) => !prev)}
          className="flex items-center space-x-2 text-white hover:bg-blue-700 px-3 py-2 rounded"
          type="button"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-semibold">
            {user.name?.charAt(0).toUpperCase() || "?"}
          </div>
          <span className="lg:inline text-white">{user.name}</span>
        </Button>

        {isUserMenuOpen && (
          <div
            ref={userMenuRef}
            className="absolute right-0 top-12 w-40 bg-white rounded-md shadow-md z-50"
          >
            <Link
              to="/profile"
              className="block text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-200"
              onClick={() => setIsUserMenuOpen(false)}
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    );

  const desktopNavigation = (
    <div className="hidden md:flex space-x-1 items-center">
      {renderNavLinks()}
      {user && (
        <ActionButton
          // The title can be either a plain string
          // or a custom element. Here we mimic your old UI:
          title={
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-semibold">
                {user.name?.charAt(0).toUpperCase() || "?"}
              </div>
              <span className="lg:inline text-white">{user.name}</span>
            </div>
          }
          // The actions array is your dropdown items:
          actions={[
            {
              label: "Profile",
              onClick: () => {},
            },
            {
              label: "Logout",
              onClick: () => {
                handleLogout();
              },
            },
          ]}
        />
      )}
    </div>
  );

  const mobileNavigation = (
    <div
      ref={menuRef}
      className="fixed inset-x-0 top-12 bg-blue-600 shadow-md md:hidden z-50"
    >
      {renderNavLinks(true)}
      {user && (
        <div className="px-4 py-3 border-t border-blue-700">
          <div className="flex items-center space-x-3 mb-2 text-white">
            <AccountCircleIcon />
            <span>{user.name}</span>
          </div>
          <Button
            type="button"
            onClick={handleLogout}
            className="w-full py-2 bg-red-600 hover:bg-red-700 text-white"
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <nav className="w-full h-full relative">
      <div className="px-4 h-full">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center">
            <ApplicationLogo className="h-8 w-auto" />
            <span className="ml-2 font-bold text-xl text-white">
              {appConfig.appName}
            </span>
          </div>

          {desktopNavigation}

          <div className="md:hidden">
            <Button
              type="button"
              className="p-2 text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              ref={buttonRef}
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && mobileNavigation}
    </nav>
  );
};

export default Navigation;
