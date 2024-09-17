import type { TODO } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MdOutlineInfo, MdDeleteForever } from "react-icons/md";



function TodoBlock({ todo }: { todo: TODO }) {

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: () => {
      return fetch(`/api/todos/deleteTodo/${todo._id}`, {
        method: "DELETE",
        credentials: "include"
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    }
  })



  const handleDeleteTodo = () => {
    mutate()
  }


  return (
    <div className="min-w-[280px] py-1 px-2 border border-green-500 rounded-lg flex items-center justify-between my-2">
      <div>
        <MdOutlineInfo className="text-2xl text-yellow-400" />
      </div>
      <div className="">
        {todo.title}
      </div>
      <div>
        <MdDeleteForever className="text-red-500 text-2xl hover:text-gray-400 cursor-pointer" onClick={handleDeleteTodo} />
      </div>
    </div>
  )
}

export default TodoBlock
