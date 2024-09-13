import { useNavigate } from "react-router-dom"

interface NOTEBLOCK {
  title: string
}


function NoteBlock({ title }: NOTEBLOCK) {
  const navigate = useNavigate()
  return (
    <div className='border border-secondText h-[150px] w-[150px] rounded-lg py-2 px-1 text-text cursor-pointer hover:bg-second hover:scale-95 transition ease-in-out duration-200 inline-block' onClick={() => { navigate(`/notes/${title}`) }}>

      <div id="noteTitle" className="w-full text-center">
        {title}
      </div>


    </div>
  )
}

export default NoteBlock
