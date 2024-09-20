import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks"
import { closeSetting } from "@/store/EditSetting";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
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

  const fetchAndSetUser = async () => {
    const result = await fetchEn("/api/user/getCurrentUser")
    if (result.success) {
      setUser(result.data)
      setUsernameValue(result.data.username)
    }
  }

  const handleUsernameButton = async () => {
    if (editModeUsername) {
      if (usernameValue === user?.username) {
        setEditModeUsername(false)
      } else {

        const response = await fetch("/api/user/updateUsername", {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ newUsername: usernameValue })
        })

        const result = await response.json()

        toast.success(result.message)
        setEditModeUsername(false)
        setUser(result.data)

      }

    } else {
      setEditModeUsername((p) => !p)
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
                onClick={() => { }}>
                {editModeEmail ? "Save" : "Edit"}
              </Button>
            </div>
          </div>










        </div>

        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>)
}

export default EditProfile
