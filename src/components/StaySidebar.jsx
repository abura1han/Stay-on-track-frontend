import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import MenuContext from "../contexts/MenuContext";

const StaySidebar = () => {
  const [isMenuLableShow, setIsMenuLableShow] = useState(true);
  const { menuList } = useContext(MenuContext);

  return (
    <div className="hidden sm:block w-16">
      <nav className="bg-white shadow shadow-gray-300  border border-gray-300 min-h-stay-nav-min-height rounded hidden sm:block fixed left-0 z-30">
        <ul className="mt-2">
          {menuList &&
            menuList.map(({ label, icon, url }, i) => (
              <li className="flex relative mb-2" key={i}>
                <NavLink
                  to={url}
                  style={({ isActive }) =>
                    isActive
                      ? {
                          fontWeight: 600,
                          backgroundColor: "#E5E5E5",
                        }
                      : {}
                  }
                  className="px-5 py-2 flex items-center hover:bg-gray-200 w-full"
                >
                  <div className="flex">{icon}</div>
                  {isMenuLableShow && <div className="ml-4">{label}</div>}
                </NavLink>
              </li>
            ))}
          <li
            className="mb-3"
            onClick={() => setIsMenuLableShow(!isMenuLableShow)}
          >
            <NavLink
              to={""}
              className="px-5 py-2 flex items-center hover:bg-gray-200 w-full"
            >
              <div className="flex">
                <span
                  className={`material-icons-outlined ${
                    isMenuLableShow ? "rotate-90" : "rotate-[270deg]"
                  }`}
                >
                  expand_circle_down
                </span>
              </div>
              {isMenuLableShow && <div className="ml-4">Collapse</div>}
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default React.memo(StaySidebar);
