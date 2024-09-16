import { fetchEn } from "@/utils/user";
import AddNote from "@/components/self/AddNote";
import NoteBlock from "@/components/self/NoteBlock";
import { useQuery } from "@tanstack/react-query";
import type { NOTE } from "@/types";



function Notes() {
  const fetchNotes = async () => {
    const result = await fetchEn("/api/notes/getAllNotes")

    return result.data
  }

  const { isLoading, data } = useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes
  })

  return (
    <div className="min-h-[500px] tablet:min-h-[800px]">
      <AddNote />
      {isLoading ? (
        <div>Loading...</div>
      ) : data && data.length === 0 ? (
        <div>NO NOTES POSTED</div>
      ) : (
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-4 mt-10 pc:justify-start pc:mx-6">
          {data?.map((item: NOTE) => (
            <NoteBlock key={item._id} title={item.title} />
          ))}
        </div>
      )}
    </div>
  )


}

export default Notes;
