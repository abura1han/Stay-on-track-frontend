import React, { useContext, useEffect, useState } from "react";
import Logo from "../Logo.svg";
import { Link, NavLink } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import MenuContext from "../contexts/MenuContext";
import { useLocation } from "react-router-dom";

const StayHeader = () => {
  const [time, setTime] = useState("--:-- --");
  const [date, setDate] = useState("-- -- --");
  const [page, setPage] = useState("");
  const [isPageMenuHidden, setIsPageMenuHidden] = useState(false);
  const [isSubmenuHidden, setIsSubmenuHidden] = useState(false);
  const { name, avatar } = useLocalStorage();
  const [isMenuLableShow] = useState(true);
  const { menuList } = useContext(MenuContext);
  const { pathname } = useLocation();

  // Get page name
  useEffect(() => {
    const path = pathname;
    setPage(path.split("/")[2]);
  }, [pathname]);

  // Get time and date
  useEffect(() => {
    const getTimeAndDate = setInterval(() => {
      const DATE = new Date(Date.now());
      const hours = DATE.getHours();
      const minutes = DATE.getMinutes();
      const day = DATE.getDate();
      const month = DATE.toLocaleString("en-us", { month: "short" });
      const year = DATE.getFullYear().toString().slice(-2);

      setTime(`${hours}:${minutes} ${hours >= 12 ? "PM" : "AM"}`);
      setDate(`${day}-${month}-${year}`);
    }, 1000);

    return () => {
      clearInterval(getTimeAndDate);
    };
  });

  // Handle logout
  const handleLogout = () => {
    // Clear localstorage and redirect to homepage
    window.localStorage.clear();
    window.location.replace("/");
  };

  return (
    <header className="flex justify-between mb-2 sticky top-0 left-0 z-30">
      <div className="sm:px-3 px-2 py-3 bg-white shadow shadow-gray-300  border border-gray-200 rounded flex items-center justify-center">
        <Link to={"/stay/dashboard"} className="flex">
          <div>
            <img src={Logo} alt="Stay on track logo" className="sm:w-8 w-7" />
          </div>
          <div className="ml-2 font-semibold text-xl text-gray-500 hidden md:block">
            Stay on track
          </div>
        </Link>
      </div>
      <div className="flex flex-1 justify-between px-2 sm:px-5 py-2 sm:ml-2 rounded items-center bg-white shadow shadow-gray-300  border border-gray-200">
        {/* Page name section */}
        <button
          onClick={() => setIsPageMenuHidden(!isPageMenuHidden)}
          className="relative"
        >
          <h2 className="text-gray-400 sm:text-lg  ">
            <div className="sm:hidden flex items-center">
              Menu
              <span className="material-icons-outlined">expand_more</span>
            </div>
            <div className="hidden sm:block uppercase">{page}</div>
          </h2>
          {isPageMenuHidden && (
            <div className="absolute left-0 top-full w-52 mt-3 py-3 bg-white z-10 shadow-sm shadow-gray-400 rounded">
              <ul>
                {menuList &&
                  menuList.map(({ label, icon, url }, i) => (
                    <li className="flex relative" key={i}>
                      <NavLink
                        to={url}
                        style={({ isActive }) =>
                          isActive
                            ? { fontWeight: 600, backgroundColor: "#E5E5E5" }
                            : {}
                        }
                        className="px-5 py-2 flex items-center hover:bg-gray-200 w-full"
                      >
                        <div className="flex">{icon}</div>
                        {isMenuLableShow && <div className="ml-4">{label}</div>}
                      </NavLink>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </button>

        {/* Clock section */}
        <div>
          <button className="text-black font-medium text-base flex">
            {time}{" "}
            <span className="hidden sm:block">
              <span className="mx-2">|</span>
              {date}
            </span>
          </button>
        </div>

        {/* Profile section */}
        <div className="flex items-center relative">
          <button
            className="sm:mr-2"
            onClick={() => setIsSubmenuHidden(!isSubmenuHidden)}
          >
            <img
              src={avatar}
              alt="Profile"
              className="sm:w-9 w-8 rounded-full"
            />
          </button>
          <button
            className="hidden sm:flex items-center"
            onClick={() => setIsSubmenuHidden(!isSubmenuHidden)}
          >
            <div className="text-base text-gray-600">{name}</div>
            <div className="ml-1 flex">
              <span className="material-icons-outlined">expand_more</span>
            </div>
          </button>
          {/* Submenu */}
          {isSubmenuHidden && (
            <div className="absolute right-0 top-full w-52 py-3 bg-white z-10 shadow-sm shadow-gray-400 rounded">
              <ul className="mt-2">
                <li className="flex relative">
                  <NavLink
                    to={"/stay/profile"}
                    style={({ isActive }) =>
                      isActive
                        ? { fontWeight: 600, backgroundColor: "#E5E5E5" }
                        : {}
                    }
                    className="px-5 py-2 flex items-center hover:bg-gray-200 w-full"
                  >
                    <div className="flex">
                      <span className="material-icons-outlined">
                        account_circle
                      </span>
                    </div>
                    {isMenuLableShow && <div className="ml-4">Profile</div>}
                  </NavLink>
                </li>
                <li className="flex relative" onClick={handleLogout}>
                  <NavLink
                    to={""}
                    className="px-5 py-2 flex items-center hover:bg-gray-200 w-full"
                  >
                    <div className="flex">
                      <span className="material-icons-outlined">logout</span>
                    </div>
                    {isMenuLableShow && <div className="ml-4">Logout</div>}
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default React.memo(StayHeader);
