import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks"
import { closeSetting } from "@/store/EditSetting";
import { IoMdClose } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { USER } from "@/types";
import { fetchEn } from "@/utils/user";
import { toast } from "react-toastify";
import { Label } from "../ui/label";


function EditProfile() {

  const dispatch = useAppDispatch()
  const settingStatus = useAppSelector(state => state.setting.settingOpenStatus)
  const [user, setUser] = useState<USER | null>(null)

  const [editModeUsername, setEditModeUsername] = useState<boolean>(false)
  const [usernameValue, setUsernameValue] = useState<string>("")

  const [editModeEmail, setEditModeEmail] = useState<boolean>(false)
  const [emailValue, setEmailValue] = useState<string>("")

  const [oldPasswordValue, setOldPasswordValue] = useState<string>("")
  const [newPasswordValue, setNewPasswordValue] = useState<string>("")
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const fetchAndSetUser = async () => {
    const result = await fetchEn("/api/user/getCurrentUser")
    if (result.success) {
      setUser(result.data)
      setUsernameValue(result.data.username)
      setEmailValue(result.data.email)
    }
  }

  const handleUsernameButton = async () => {
    if (editModeUsername) {
      if (usernameValue === user?.username) {
        setEditModeUsername(false)
      } else {

        try {

          const response = await fetch("/api/user/updateUsername", {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ newUsername: usernameValue })
          })

          const result = await response.json()

          if (result.success) {
            toast.success(result.message)
            setEditModeUsername(false)
            setUser(result.data)
          } else {
            toast.error(result.message)
          }

        }
        catch (error) {
          toast.error("Something went wrong")
        }
      }

    } else {
      setEditModeUsername(true)
    }
  }

  const handleEmailButton = async () => {

    if (editModeEmail) {

      if (emailValue === user?.email) {
        setEditModeEmail(false)
      } else {

        try {
          const response = await fetch("/api/user/updateEmail", {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ newEmail: emailValue })
          })

          const result = await response.json()
          if (result.success) {
            toast.success(result.message)
            setUser(result.data)
            setEditModeEmail(false)
          } else {
            toast.error(result.message)
          }

        } catch (error) {
          toast.error("Something went wrong")
        }
      }
    } else {
      setEditModeEmail(true)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (oldPasswordValue.trim() === "" && newPasswordValue.trim() === "") {
      setPasswordError("Both field are required")
    } else if (oldPasswordValue.trim() === "") {
      setPasswordError("Old password is required")
    } else if (newPasswordValue.trim() === "") {
      setPasswordError("New password is required")
    } else {
      setPasswordError(null)

      try {

        const response = await fetch("/api/user/updatePassword", {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ oldPassword: oldPasswordValue, newPassword: newPasswordValue })
        })
        const result = await response.json()

        if (result.success) {
          toast.success(result.message)
          setOldPasswordValue("")
          setNewPasswordValue("")

        } else {
          setPasswordError(result.message)
        }

      } catch (error) {
        toast.error("Something went wrong")

      }

    }
  }


  useEffect(() => {
    fetchAndSetUser()
  }, [settingStatus])

  return (<>
    <Dialog open={settingStatus} >
      <DialogContent className="sm:max-w-[425px] bg-second rounded-lg">
        <Button className="absolute right-2 top-2 z-10 bg-green-700"
          variant="outline"
          onClick={() => dispatch(closeSetting())}
        >
          <IoMdClose className="text-xl" />
        </Button>

        <DialogHeader>
          <DialogTitle>Edit Account</DialogTitle>
          <DialogDescription>
            Make changes to your account here.
          </DialogDescription>
        </DialogHeader>
        <div id="body" className="">

          <div id="username" className="text-black flex gap-x-2 items-center flex-wrap">

            <Label className="text-text">Username</Label>
            <div className="flex gap-x-2">
              <Input value={usernameValue}
                disabled={!editModeUsername}
                className="tablet:min-w-[300px]"
                onChange={(e) => {
                  setUsernameValue(e.target.value)
                }} />
              <Button
                className={`bg-transparent text-text ${editModeUsername ? "border-green-500" : "border-third"}`}
                variant="outline"
                onClick={handleUsernameButton}>
                {editModeUsername ? "Save" : "Edit"}
              </Button>
            </div>
          </div>

          <div id="email" className="text-black flex gap-x-2 items-center flex-wrap mt-5">

            <Label className="text-text mr-8">Email</Label>
            <div className="flex gap-x-2 ">
              <Input value={emailValue}
                disabled={!editModeEmail}
                className="tablet:min-w-[300px]"
                onChange={(e) => {
                  setEmailValue(e.target.value)
                }} />
              <Button
                className={`bg-transparent text-text ${editModeEmail ? "border-green-500" : "border-third"}`}
                variant="outline"
                onClick={handleEmailButton}>
                {editModeEmail ? "Save" : "Edit"}
              </Button>
            </div>
          </div>


          <Dialog>
            <div className="w-full flex justify-center">
              <DialogTrigger asChild>

                <Button variant="outline" className="bg-transparent mt-10 mx-auto border-green-500">
                  Update Password
                </Button>
              </DialogTrigger>
            </div>
            <DialogContent className="sm:max-w-[425px] bg-second rounded-lg">
              <DialogHeader>
                <DialogTitle>Update Password</DialogTitle>
                <DialogDescription />
              </DialogHeader>
              <div id="updatePassword" className="">
                <form onSubmit={handlePasswordSubmit}>

                  <div id="old" className="flex gap-x-4 items-center flex-wrap mt-5 justify-evenly">
                    <Label className="">Old Password</Label>
                    <div>
                      <Input className="tablet:min-w-[300px] text-black"
                        value={oldPasswordValue}
                        onChange={(e) => {
                          setOldPasswordValue(e.target.value)
                        }} />
                    </div>
                  </div>
                  <div id="new" className="flex gap-x-2 items-center flex-wrap mt-5 justify-evenly">
                    <Label className="">New Password</Label>
                    <div>
                      <Input className="tablet:min-w-[300px] text-black"
                        value={newPasswordValue}
                        onChange={(e) => {
                          setNewPasswordValue(e.target.value)
                        }} />
                    </div>
                  </div>
                  {passwordError
                    &&
                    <div className="flex flex-col items-center text-sm text-red-500 my-2 ">
                      <span>{passwordError}</span>
                    </div>}
                  <div id="buttons" className="flex justify-evenly mt-10">
                    <DialogClose asChild>
                      <Button variant="outline"
                        className="bg-transparent border-red-500"
                        onClick={() => {
                          setOldPasswordValue("")
                          setNewPasswordValue("")
                        }}>Cancel</Button>
                    </DialogClose>
                    <Button variant="outline"
                      className="bg-transparent border-green-500"
                      type="submit"
                    >Update</Button>

                  </div>
                </form>
              </div>
            </DialogContent>
          </Dialog>

        </div>

        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>)
}

export default EditProfile
