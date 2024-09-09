import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useParams, useNavigate } from "react-router-dom"
import { fetchEn } from "@/utils/user"
import { useEffect, useState } from "react"
import type { NOTE } from "@/types"
import { Button } from "@chakra-ui/react"

function InNotes() {

	const { title } = useParams()
	const navigate = useNavigate()
	const [note, setNote] = useState<NOTE | null>(null)
	const [editModeTitle, setEditModeTitle] = useState<boolean>(false)
	console.log(note)

	const breadcStyle = "hover:cursor-pointer hover:text-third"

	useEffect(() => {
		const fetchNote = async () => {

			const response = await fetchEn(`/api/notes/getNoteByTitle/${title}`)
			setNote(response.data)
		}
		fetchNote()


	}, [])

	if (!note) {
		return (
			<div className="text-white">Loading</div>
		)
	}
	return (
		<>
			<div id="breadc" className="flex justify-center items-center my-2">
				<Breadcrumb>
					<BreadcrumbList className="text-text hover:text-white">
						<BreadcrumbItem>
							<BreadcrumbLink className={`${breadcStyle}`} onClick={() => { navigate("/notes") }} >Notes</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink className={`${breadcStyle}`}>{title}</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			<div id="noteBody">

				<div id="header">

					<div id="title" className="">

						<label>Title</label>
						<input value={title} disabled={!editModeTitle} />
						<Button variant="outline" colorScheme={editModeTitle ? "green" : "cyan"} onClick={
							() => { setEditModeTitle((prev) => !prev) }}>
							{editModeTitle ? "Save" : "Edit"}
						</Button>
					</div>



				</div>




			</div>
		</>
	)
}

export default InNotes
