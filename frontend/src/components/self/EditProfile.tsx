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


function EditProfile() {

  const dispatch = useAppDispatch()
  const settingStatus = useAppSelector(state => state.setting.settingOpenStatus)
  const [user, setUser] = useState<USER | null>(null)

  const fetchAndSetUser = async () => {
    const result = await fetchEn("/api/user/getCurrentUser")
    if (result.success) {
      setUser(result.data)
    }
  }

  const [editModeUsername, setEditModeUsername] = useState<boolean>(false)
  const handleUsernameButton = () => {
    setEditModeUsername((p) => !p)

  }

  useEffect(() => {
    fetchAndSetUser()
  }, [])

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

            <label className="text-text">Username</label>
            <div className="flex gap-x-2">
              <Input value={user?.username} disabled={!editModeUsername}
                className="tablet:min-w-[300px]" />
              <Button
                className={`bg-transparent text-text ${editModeUsername ? "border-green-500" : "border-third"}`}
                variant="outline"
                onClick={handleUsernameButton}>{editModeUsername ? "Save" : "Edit"}</Button>
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
