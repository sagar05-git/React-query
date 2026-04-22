import { NavLink } from "react-router-dom";

export default function Header() {
  const baseStyle = "px-4 py-2 rounded-md transition";
  const activeStyle = "bg-blue-500 text-white";
  const inactiveStyle = "text-gray-700 hover:bg-gray-200";

  return (
    <header className="shadow-md bg-white">
      <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
        
        {/* Logo */}
        <h1 className="text-xl font-bold">MyApp</h1>

        {/* Navigation Links */}
        <div className="flex gap-4">
          
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/fetch-old"
            className={({ isActive }) =>
              `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            Fetch Old
          </NavLink>

          <NavLink
            to="/fetch-react-query"
            className={({ isActive }) =>
              `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            React Query
          </NavLink>
          <NavLink
            to="/fetch-react-query-pagination"
            className={({ isActive }) =>
              `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            Pagination
          </NavLink>
          <NavLink
            to="/infinite-scroll"
            className={({ isActive }) =>
              `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            Infinite Scroll
          </NavLink>
          <NavLink
            to="/infinite-scroll-intersection-observer"
            className={({ isActive }) =>
              `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            Infinite Scroll (IO)
          </NavLink>

        </div>
      </nav>
    </header>
  );
}