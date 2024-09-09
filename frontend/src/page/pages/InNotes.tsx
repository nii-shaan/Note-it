import { useParams } from "react-router-dom"
function InNotes() {

	const {title} = useParams()

  return (
    <div>InNotes: {title}</div>
  )
}

export default InNotes
