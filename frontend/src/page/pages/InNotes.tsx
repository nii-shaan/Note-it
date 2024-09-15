import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useParams, useNavigate } from "react-router-dom"
import { fetchEn } from "@/utils/user"
import { useEffect, useState, useMemo } from "react"
import type { NOTE } from "@/types"
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "react-toastify"
import { Button } from "@chakra-ui/react"
import JoditEditor from 'jodit-react';

type Inputs = {
  title: string
}

function InNotes() {

  const { title } = useParams()
  const navigate = useNavigate()
  const [note, setNote] = useState<NOTE | null>(null)
  const [editModeTitle, setEditModeTitle] = useState<boolean>(false)
  const [titleFieldValue, setTitleFieldValue] = useState<string>("")

  const [editModeContent, setEditModeContent] = useState<boolean>(false)
  console.log("Content edit mode: ", editModeContent)
  const [contentFieldValue, setContentFieldValue] = useState<string>("")
  console.log(contentFieldValue)

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
      if (note?.title !== d.title) {

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
            setNote(result.data)
          } else {
            toast.error(`FAILED: ${result.message}`)
          }
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
      setTitleFieldValue(title || "")
      setContentFieldValue(response.data.content)
    }
    fetchNote()

  }, [])


  const handleUpdateContent = async () => {
    if (editModeContent) {

      if (note?.content === contentFieldValue) {
        setEditModeContent(false)
      } else {
        try {
          const response = await fetch("/api/notes/updateContent", {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, newContent: contentFieldValue })
          })

          const result = await response.json()

          if (result.success) {
            setEditModeContent(false)
            setContentFieldValue(result.data.content)
            toast.success(`SUCCESS: ${result.message}`)
            setNote(result.data)
          } else {
            toast.error(`FAILED: ${result.message}`)
          }
        }
        catch (e) {
          toast.error("FAILED: Something went wrong")
        }
      }
    } else {
      setEditModeContent(true)
    }

  }

  //text editor config
  const config = useMemo(
    () => ({
      readonly: !editModeContent, // all options from https://xdsoft.net/jodit/docs/,
    }),
    [editModeContent]
  );

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

          <form onSubmit={handleSubmit(onSubmit)} className="flex items-center tablet:items-start flex-wrap gap-x-3 gap-y-4">
            <div>
              <label htmlFor="title" className="text-text text-lg font-bold mr-2">Title </label >
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
            </div>


            <Button
              className=""
              type="submit"
              variant={"outline"}
              colorScheme="purple"
              onClick={() => {
                setEditModeTitle((prev) => errors.title ? true : !prev)
              }}
            >
              {editModeTitle ? "Save Title" : "Edit Title"}
            </Button>
            {errors.title && <div className="text-red-500 w-full mt-1 ">{errors.title.message}</div>}
          </form>
        </div>
        <div id="textEditor" className="p-2 tablet:p-5 max-w-[1200px] mx-auto">
          <div className="flex tablet:justify-end pb-4">

            <Button
              onClick={handleUpdateContent}
              variant="outline"
              colorScheme="purple">
              {editModeContent ? "Save Note" : "Edit Note"}
            </Button>

          </div>
          <JoditEditor
            value={contentFieldValue}
            config={config}
            onChange={(newContent) => {
              setContentFieldValue(newContent)
            }}
          />
        </div>
      </div>
    </>
  )
}

export default InNotes
