import { useEffect, useState } from "react";

function Notes() {
  const [data, setData] = useState({ test: "not sure" });

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch("/api/notes/getNotes", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setData(result);
    };
    fetchNotes();
  }, []);
  return <div className="text-text">data : {data.test}</div>;
}

export default Notes;
