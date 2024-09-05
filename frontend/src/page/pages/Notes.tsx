import { useEffect, useState } from "react";
import { fetchEn } from "@/utils/user";
import AddNote from "@/components/self/AddNote";

function Notes() {
	const [data, setData] = useState({ test: "not sure" });

	useEffect(() => {

		const fetchNotes = async () => {
			const result = await fetchEn("/api/notes/postNote")
			if (result.success === undefined) {
				return ""
			} else if (result.success) {
				setData(result)
			}

		}
		fetchNotes()
	}, []);
	return (
		<>
			<AddNote />
			<div className="text-text">data : {data.test}</div>;

		</>
	)


}

export default Notes;
