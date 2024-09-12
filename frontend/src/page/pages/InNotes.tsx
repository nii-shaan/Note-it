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
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "react-toastify"

type Inputs = {
	title: string
}

function InNotes() {

	const { title } = useParams()
	const navigate = useNavigate()
	const [note, setNote] = useState<NOTE | null>(null)
	const [editModeTitle, setEditModeTitle] = useState<boolean>(false)
	console.log(note)
	const [titleFieldValue, setTitleFieldValue] = useState<string>("")

	const breadcStyle = "hover:cursor-pointer hover:text-third"

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		defaultValues: {
			title
		}
	})

	const onSubmit: SubmitHandler<Inputs> = async (d) => {

		if (!editModeTitle) {
			if (title == d.title) {
				toast.error("FAILED! Updated title is same as old title!")

			} else {
				try {


					const response = await fetch("/api/notes/updateNoteTitle", {
						method: "PUT",
						credentials: "include",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ oldTitle: title, newTitle: d.title })
					})

					const result = await response.json()

					if (result.success) {
						toast.success(`SUCCESS: ${result.message}`)
						navigate(`/notes/${result.data.title}`)
					}

					console.log(result)
				} catch (e) {
					toast.error("Something went wrong!")
				}

			}

		}
	}

	useEffect(() => {
		const fetchNote = async () => {

			const response = await fetchEn(`/api/notes/getNoteByTitle/${title}`)
			setNote(response.data)
		}
		fetchNote()
		setTitleFieldValue(title || "")
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

				<div id="header" className="mt-5 w-full p-2">

					<form onSubmit={handleSubmit(onSubmit)} className="flex items-center flex-wrap gap-x-3 gap-y-4">

						<label htmlFor="title" className="text-text text-lg font-bold">Title </label >
						<input id="title" value={titleFieldValue} disabled={!editModeTitle} {...register("title", {
							required: "Title is required!",
							pattern: {
								value: /^[a-zA-Z0-9_-]+$/,
								message: "'-', '_', Alphabets & Numbers only!"
							}
						})} className="bg-transparent border-2 text-text text-center outline-none rounded-lg  py-1 disabled:bg-second enabled:border-green-400 disabled:border-third"
							onChange={(e) => {
								setTitleFieldValue(e.target.value)
							}

							}
						/>

						{errors.title && <div className="text-red-500 w-full tablet:w-auto tablet:inline-block mt-1 mx-auto">{errors.title.message}</div>}

						<button
							type="submit"
							onClick={() => {
								setEditModeTitle((prev) => errors.title ? true : !prev)
							}}
							className={`text-text border-2  py-2 px-4 rounded-lg hover:bg-second 
								${editModeTitle ? ("border-green-400") : ("border-third")}
								 border-green-400`}
						>
							{editModeTitle ? "Save Title" : "Edit Title"}
						</button>
					</form>
				</div>
			</div>
		</>
	)
}

export default InNotes
