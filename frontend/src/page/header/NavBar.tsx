import { Link, useNavigate, NavLink } from "react-router-dom";

function NavBar() {
  const navItemStyleActive = "border-b px-2 py-1 transition-all duration-100 ease-in-out";
  const navItemStyleInActive = "px-2 py-1 transition-all duration-100 ease-in-out";
  return (
    <div className="h-16 w-min bg-second text-secondText  flex justify-center items-center gap-x-3 px-2  mx-auto mt-5 sticky">
      <NavLink
        to=""
        className={({ isActive }) =>
          isActive ? `${navItemStyleActive}` : `${navItemStyleInActive}`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/register"
        className={({ isActive }) =>
          isActive ? `${navItemStyleActive}` : `${navItemStyleInActive}`
        }
      >
        Register
      </NavLink>
    </div>
  );
}

export default NavBar;
