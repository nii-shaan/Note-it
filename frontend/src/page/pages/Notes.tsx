import { logout } from "@/utils/user";
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
			if (result.message === "Access token refreshed" && result.statusCode === 200 && !result.success) {
				const response = await fetch("/api/notes/getNotes", {
					method: "GET",
					credentials: "include",
					headers: {
						"Content-Type": "application/json"
					}
				})

				const result1 = await response.json();
				setData(result1);

			} else if (result.message === "Refresh token is expired" && result.statusCode === 403) {
				logout({ msg: "Session expired!", showToast: true, type: "error" })

			} else if (result.message === "Tokens not provided" && !result.success) {
				logout({ showToast: false })

			} else {
				setData(result)
			}
		};
		fetchNotes();
	}, []);
	return <div className="text-text">data : {data.test}</div>;
}

export default Notes;
