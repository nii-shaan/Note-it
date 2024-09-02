import { logout } from "@/utils/user";
import { useEffect, useState } from "react";
import { fetchEn } from "@/utils/user";
function Notes() {
	const [data, setData] = useState({ test: "not sure" });

	useEffect(() => {

		const fetchNotes = async () => {
			const result = await fetchEn("/api/notes/getNotes")
			if (result.success===undefined) {
				return ""
			}else if(result.success){
				setData(result)
			}

		}
		fetchNotes()
	}, []);
	return <div className="text-text">data : {data.test}</div>;
}

export default Notes;
