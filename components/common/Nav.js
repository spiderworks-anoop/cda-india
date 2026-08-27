import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/images/logo.svg";
import { MenuLineicon } from "../common/svgicon";

const Navbar = ({ navmenu }) => {
  // Menu urls come from the CMS and are stored either absolute ("/dubai/x") or
  // relative to their parent ("x" under "services"). Prepending the parent to
  // one that is already absolute is what turned a "/dubai/..." entry sitting
  // under a "/" parent into "////dubai/...", which next/link rejects.
  const handleNavigate = (url, parentUrl) => {
    if (!url) {
      return "#";
    }

    const path = url?.startsWith("/")
      ? url
      : [parentUrl, url].filter(Boolean).join("/");

    return "/" + path.replace(/^\/+/, "").replace(/\/{2,}/g, "/");
  };

  return (
    <nav className="hidden md:block">
      <ul className="flex flex-col md:flex-row items-center justify-center md:gap-[28px] gap-[15px]">
        {navmenu?.map((item, index) => (
          <li
            key={index}
            className={`relative group nav-list-item ${
              item?.children?.length > 0 ? "has_child" : ""
            }`}
          >
            <Link
              href={handleNavigate(item?.url) || "#"}
              className="flex items-center gap-1"
            >
              {item?.title}
              {item?.children?.length > 0 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="M12 15L17 10H7L12 15Z" fill="white" />
                </svg>
              )}
            </Link>

            {/* First Level Dropdown */}
            {item?.children?.length > 0 && (
              <ul className="drop_menu absolute left-0 top-full mt-2 hidden group-hover:block bg-black text-white p-2 z-10">
                {item.children.map((child, childIndex) => (
                  <li
                    key={childIndex}
                    className={`relative group ${
                      child?.children?.length > 0 ? "has_child" : ""
                    }`}
                  >
                    <Link
                      href={handleNavigate(child?.url) || "#"}
                      className="block px-4 py-2 hover:bg-gray-700"
                    >
                      {child.title}
                    </Link>

                    {/* Second Level Dropdown */}
                    {child?.children?.length > 0 && (
                      <ul className="drop_menu_level absolute left-full top-0 mt-0 hidden group-hover:block bg-black text-white p-2 z-10">
                        {child.children.map((innerChild, innerIndex) => (
                          <li key={innerIndex}>
                            <Link
                              href={handleNavigate(innerChild?.url, item?.url)}
                              className="block px-4 py-2 hover:bg-gray-700"
                            >
                              {innerChild.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
