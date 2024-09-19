import { NavLink } from "react-router-dom";
import { CiSettings } from "react-icons/ci";
import { logout } from "../../utils/user";
import { useAppSelector } from "@/hooks/reduxHooks";
import EditProfile from "@/components/self/EditProfile";

function NavBar() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const navItemStyleActive =
    "  px-2 py-1 rounded-md transition-all duration-300 ease-in-out scale-110 bg-third text-text";
  const navItemStyleInActive =
    "px-2 py-1 transition-all duration-300 ease-in-out scale-90 text-text rounded-md hover:bg-[#495464] hover:text-text bg-second";
  return (
    <div className="h-12 w-min rounded-xl  text-secondText  flex justify-center items-center gap-x-5 px-5  mx-auto mt-2 mb-6">
      <NavLink
        to=""
        className={({ isActive }) =>
          isActive ? `${navItemStyleActive}` : `${navItemStyleInActive}`
        }
      >
        Home
      </NavLink>
      {!isLoggedIn ? (
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

          <button className={navItemStyleInActive} onClick={() => logout()}>
            Logout
          </button>

          <span className="flex items-center justify-center h-full absolute right-2 tablet:right-10">
            <CiSettings className="text-2xl tablet:text-4xl cursor-pointer text-white 
            hover:rotate-180 transition-transform duration-700 hover:text-green-500" />
          </span>

          <EditProfile/>
        </>
      )}
    </div>
  );
}

export default NavBar;
