import { NavLink } from "react-router-dom";
import logoutUtil from "../../utils/logout";
import { useAppSelector } from "../../hooks/ReduxHooks";

function NavBar() {
  const userStatus = useAppSelector((state) => state.user);

  const navItemStyleActive =
    "  px-2 py-1 rounded-md transition-all duration-300 ease-in-out scale-110 bg-[#071952] text-second";
  const navItemStyleInActive =
    "px-2 py-1 transition-all duration-300 ease-in-out scale-90 text-text rounded-md hover:bg-main hover:text-text  ";
  return (
    <div className="h-12 w-min rounded-xl bg-second text-secondText  flex justify-center items-center gap-x-5 px-5  mx-auto mt-2 sticky top-0">
      <NavLink
        to=""
        className={({ isActive }) =>
          isActive ? `${navItemStyleActive}` : `${navItemStyleInActive}`
        }
      >
        Home
      </NavLink>

      {!userStatus.loggedIn ? (
        <>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? `${navItemStyleActive}` : `${navItemStyleInActive}`
            }
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? `${navItemStyleActive}` : `${navItemStyleInActive}`
            }
          >
            Register
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            to="/notes"
            className={({ isActive }) =>
              isActive ? `${navItemStyleActive}` : `${navItemStyleInActive}`
            }
          >
            Notes
          </NavLink>

          <button
            className={navItemStyleInActive}
            onClick={() => logoutUtil({ showToast: true })}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default NavBar;
