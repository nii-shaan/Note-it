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
        <div className="w-full flex flex-col items-center mt-32">
          <div>
            <div className="loader">
              <svg viewBox="0 0 80 80">
                <circle r="32" cy="40" cx="40" id="test"></circle>
              </svg>
            </div>

            <div className="loader triangle">
              <svg viewBox="0 0 86 80">
                <polygon points="43 8 79 72 7 72"></polygon>
              </svg>
            </div>

            <div className="loader">
              <svg viewBox="0 0 80 80">
                <rect height="64" width="64" y="8" x="8"></rect>
              </svg>
            </div>
          </div>

          <div className="text-green-500 mt-2">No any Notes</div>

        </div>
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
