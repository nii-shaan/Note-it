import { fetchEn } from "@/utils/user";
import AddNote from "@/components/self/AddNote";
import NoteBlock from "@/components/self/NoteBlock";

import { useQuery } from "@tanstack/react-query";


interface NOTE {
	_id: string;
	title: string;
	content: string;
	owner: string;
	createdAt: string;
	updatedAt: string;
	__v: number | string;
}
function Notes() {
	const fetchNotes = async () => {
		const result = await fetchEn("/api/notes/getAllNotes")
		console.log(result)
		return result.data
	}


	const { isLoading, data } = useQuery({
		queryKey: ['notes'],
		queryFn: fetchNotes
	})



	return (
		<>
			<AddNote />
			{isLoading ? (
				<div>Loading...</div>
			) : data && data.length === 0 ? (
				<div>NO NOTES POSTED</div>
			) : (
				<div className="flex flex-wrap justify-center gap-x-6 gap-y-6 mt-10 pc:justify-start pc:ml-10">
					{data?.map((item: NOTE) => (
						<NoteBlock key={item._id} title={item.title} />
					))}
				</div>
			)}
		</>
	)


}

export default Notes;
