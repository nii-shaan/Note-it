import { useNavigate } from "react-router-dom"
import { CgNotes } from "react-icons/cg";


interface NOTEBLOCK {
  title: string
}


function NoteBlock({ title }: NOTEBLOCK) {
  const navigate = useNavigate()
  return (
    <div className='border border-secondText h-[150px] w-[150px] rounded-lg py-2 px-1 text-text cursor-pointer hover:bg-second hover:scale-95 transition ease-in-out duration-200 inline-block' onClick={() => { navigate(`/notes/${title}`) }}>

      <div id="noteTitle" className="w-full text-center h-[29%] text-sm overflow-x-scroll">
        {title}
      </div>
      <div className="flex justify-center items-center h-[70%]">
      <CgNotes className="text-[60px] text-third" />
      </div>


    </div>
  )
}

export default NoteBlock
