import { useEffect, useState } from "react";

function Notes() {
  const [data, setData] = useState({ test: "not sure" });
  console.log(data);

  useEffect(() => {
    fetch("http://localhost:8000/notes/getNotes", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  return <div className="text-text">data : {data.test}</div>;
}

export default Notes;
