import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { useParams } from "react-router-dom"
import { fetchEn } from "@/utils/user"
import { useEffect, useState } from "react"
import type { NOTE } from "@/types"

function InNotes() {

	const { title } = useParams()
	const [note, setNote] = useState<NOTE | null>(null)
	console.log(note)

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
					<BreadcrumbList className="text-text">
						<BreadcrumbItem>
							<BreadcrumbLink >Notes</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink href="/components">{title}</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			<div>InNotes: {title}</div>
		</>
	)
}

export default InNotes
