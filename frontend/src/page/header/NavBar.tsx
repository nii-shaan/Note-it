import { NavLink } from "react-router-dom";
import { logout } from "../../utils/user";
import { useUserStatus } from "@/hooks/useUser";
import { useAppSelector } from "@/hooks/reduxHooks";

function NavBar() {
  const isLoggedIn = useAppSelector((state) => state.AuthSlice.isLoggedIn);
  const { data, isPending } = useUserStatus();
  if (!isPending) console.log(data);

  const navItemStyleActive =
    "  px-2 py-1 rounded-md transition-all duration-300 ease-in-out scale-110 bg-green-800 text-text";
  const navItemStyleInActive =
    "px-2 py-1 transition-all duration-300 ease-in-out scale-90 text-text rounded-md hover:bg-[#495464] hover:text-text bg-second";
  return (
    <div className="h-12 w-min rounded-xl  text-secondText  flex justify-center items-center gap-x-5 px-5  mx-auto mt-2 sticky top-0">
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

          <button
            className={navItemStyleInActive}
            onClick={() => logout({ showToast: true })}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default NavBar;
