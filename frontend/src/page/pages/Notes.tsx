import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/ReduxHooks";
import { logout } from "../../store/user.slice";

function Notes() {
  const [data, setData] = useState({ test: "not sure" });
  console.log(data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:8000/notes/getNotes", {
          credentials: "include",
        });
        const result = await response.json();

        if (
          !result.success &&
          (result.message === "Refresh token is expired" ||
            result.message === "Tokens not provided")
        ) {
          console.log("Logging out due to expired or missing tokens.");
          console.log(result);
          dispatch(logout());
        } else if (
          !result.success &&
          result.message === "Access token refreshed"
        ) {
          const secondResponse = await fetch(
            "http://localhost:8000/notes/getNotes",
            { credentials: "include" }
          );
          const secondResult = await secondResponse.json();
          setData(secondResult);
        } else {
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching notes, ", error);
      }
    };
    fetchNotes();
  }, []);
  return <div className="text-text">data : {data.test}</div>;
}

export default Notes;
