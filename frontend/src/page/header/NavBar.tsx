import { NavLink } from "react-router-dom";

function NavBar() {
  const navItemStyleActive =
    "  px-2 py-1 rounded-md transition-all duration-300 ease-in-out scale-110 bg-[#071952] text-second";
  const navItemStyleInActive =
    "px-2 py-1 transition-all duration-300 ease-in-out scale-90 text-text rounded-md hover:bg-main hover:text-text  ";
  return (
    <div className="h-14 w-min rounded-xl bg-second text-secondText  flex justify-center items-center gap-x-5 px-5  mx-auto mt-5 sticky top-0">
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
