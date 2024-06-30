import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { logout } from "../../store/user.slice";
import { toast } from "react-toastify";
import logoutUtil from "../../utils/logout";

function NavBar() {
  const userStatus = useSelector((state: RootState) => state.user);
  const dispacth = useDispatch();

  const logoutHandler = async () => {
    logoutUtil().then((data) => {
      if (data.success) {
        dispacth(logout());
        toast.success(data.message, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          pauseOnHover: false,
          closeOnClick: true,
          draggable: true,
          theme: "colored",
        });
      } else {
        toast.error("Logout failed", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          pauseOnHover: false,
          closeOnClick: true,
          draggable: true,
          theme: "colored",
        });
      }
    });
  };

  const navItemStyleActive =
    "  px-2 py-1 rounded-md transition-all duration-300 ease-in-out scale-110 bg-[#071952] text-second";
  const navItemStyleInActive =
    "px-2 py-1 transition-all duration-300 ease-in-out scale-90 text-text rounded-md hover:bg-main hover:text-text  ";
  return (
    <div className="h-12 w-min rounded-xl bg-second text-secondText  flex justify-center items-center gap-x-5 px-5  mx-auto mt-5 sticky top-0">
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

          <button className={navItemStyleInActive} onClick={logoutHandler}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default NavBar;
