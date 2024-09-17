import type { TODO } from "@/types"



function TodoBlock({ todo }: { todo: TODO }) {
  return (
    <div>{todo.title}</div>
  )
}

export default TodoBlock
