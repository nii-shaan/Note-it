import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useParams, useNavigate } from "react-router-dom"
import { fetchEn } from "@/utils/user"
import { useEffect, useState, useMemo } from "react"
import type { NOTE } from "@/types"
import { toast } from "react-toastify"
import { Button } from "@chakra-ui/react"
import JoditEditor from 'jodit-react';

function InNotes() {

  const { title } = useParams()
  const navigate = useNavigate()
  const [note, setNote] = useState<NOTE | null>(null)
  const [editModeTitle, setEditModeTitle] = useState<boolean>(false)
  const [titleFieldValue, setTitleFieldValue] = useState<string>("")
  const [titleErrorMsg, setTitleErrorMsg] = useState<string | null>(null)

  const [editModeContent, setEditModeContent] = useState<boolean>(false)
  const [contentFieldValue, setContentFieldValue] = useState<string>("")

  const breadcStyle = "hover:cursor-pointer hover:text-third"


  useEffect(() => {
    const fetchNote = async () => {

      const response = await fetchEn(`/api/notes/getNoteByTitle/${title}`)
      setNote(response.data)
      setTitleFieldValue(title || "")
      setContentFieldValue(response.data.content)
    }
    fetchNote()

  }, [])


  const handleUpdateTitle = async () => {

    if (editModeTitle) {

      if (titleFieldValue.trim() === "") {
        setTitleErrorMsg("Title is empty!")
        return null;
      }

      if (!titleFieldValue.match(/^[a-zA-Z0-9_-]+$/)) {
        setTitleErrorMsg("'-', '_', Alphabets & Numbers only!")
        return null;
      }



      if (note?.title !== titleFieldValue) {
        try {
          const response = await fetch("/api/notes/updateNoteTitle", {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ oldTitle: title, newTitle: titleFieldValue })
          })

          const result = await response.json()
          if (result.success) {
            toast.success(`SUCCESS: ${result.message}`)
            navigate(`/notes/${result.data.title}`, { replace: true })
            setNote(result.data)
          } else {
            toast.error(`FAILED: ${result.message}`)
          }
        } catch (e) {
          toast.error("Something went wrong!")
        }
        setTitleErrorMsg(null)
      }
    }
    setEditModeTitle((p) => !p)
  }


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

  const handleDeleteNote = async () => {

    try {

      const response = await fetch(`/api/notes/deleteNote/${note?.title}`, {
        method: "DELETE",
        credentials: "include",
      })

      const result = await response.json()

      if (result.success) {
        toast.success(`SUCCESS: ${result.message} `)
        navigate("/notes")
      } else {
        toast.error(`FAILED: ${result.message}`)
      }

    } catch (error) {

      toast.error("Something went wrong")

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

    <div className="min-h-[500px] tablet:min-h-[800px]">
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

          <div className="flex items-center tablet:items-start flex-wrap gap-x-3 gap-y-4">
            <div>
              <label htmlFor="title" className="text-text text-lg font-bold mr-2">Title </label >
              <input id="title"
                value={titleFieldValue}
                disabled={!editModeTitle}
                className="bg-transparent border-2 text-text text-center outline-none rounded-lg  py-1 disabled:bg-second enabled:border-green-400 disabled:border-third"
                onChange={(e) => {
                  setTitleFieldValue(e.target.value)
                }
                }
              />
              {titleErrorMsg && <div className="text-red-500 flex items-center justify-center">{titleErrorMsg}</div>}
            </div>



            <Button
              className=""
              type="submit"
              variant={"outline"}
              colorScheme="purple"
              onClick={handleUpdateTitle}>

              {editModeTitle ? "Save Title" : "Edit Title"}
            </Button>

          </div>
        </div>
        <div id="textEditor" className="p-2 tablet:p-5 max-w-[1300px] mx-auto">
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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" colorScheme="red"
                className="mt-3">Delete Note</Button>
            </DialogTrigger>
            <DialogContent className="bg-second text-text rounded-xl text-sm ">
              <DialogHeader>
                <DialogTitle>Are you sure you want to delete this?</DialogTitle>
                <DialogDescription className="text-red-500">
                  This is an irreversible action
                </DialogDescription>
              </DialogHeader>

              <div className="flex items-center justify-evenly">
                <DialogClose asChild>
                  <Button colorScheme="green" variant="outline">NO</Button>
                </DialogClose>
                <Button colorScheme="red" variant="outline" onClick={handleDeleteNote}>YES</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default InNotes
