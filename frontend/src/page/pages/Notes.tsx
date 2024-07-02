import { useEffect, useState } from "react";
import logoutUtil from "../../utils/logout";

function Notes() {
  const [data, setData] = useState({ test: "not sure" });

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
          logoutUtil({
            showToast: true,
            msg: "Session expired! please login again",
          });
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
