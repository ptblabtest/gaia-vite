import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

const Breadcrumbs = ({ links = [] }) => {
  return (
    <div className="bg-white">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          {links.map((link, index) => {
            const isFirst = index === 0;

            const content = link.href ? (
              <Link
                to={link.href}
                className={`${
                  isFirst ? "flex items-center" : ""
                } text-black-700 underline dark:text-black-400`}
              >
                {isFirst && <HomeIcon className="text-lg me-1" />}
                {link.label}
              </Link>
            ) : (
              <span
                className={`${
                  isFirst ? "flex items-center" : ""
                } text-black-500`}
              >
                {isFirst && <HomeIcon className="text-lg me-1" />}
                {link.label}
              </span>
            );

            return (
              <li
                key={index}
                className="inline-flex items-center text-lg font-medium"
              >
                {index > 0 && <span className="mx-1 text-black-400">{">"}</span>}
                {content}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumbs;
