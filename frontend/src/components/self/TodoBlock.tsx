import type { TODO } from "@/types"
import { MdOutlineInfo, MdDeleteForever } from "react-icons/md";



function TodoBlock({ todo }: { todo: TODO }) {
  return (
    <div className="min-w-[280px] py-1 px-2 border border-green-500 rounded-lg flex items-center justify-between">
      <div>
        <MdOutlineInfo className="text-2xl text-yellow-400" />
      </div>
      <div className="">
        {todo.title}
      </div>
      <div>
        <MdDeleteForever className="text-red-500 text-2xl hover:text-gray-400 cursor-pointer" />
      </div>
    </div>
  )
}

export default TodoBlock
