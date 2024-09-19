import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks"
import { closeSetting } from "@/store/EditSetting";
import { IoMdClose } from "react-icons/io";

function EditProfile() {

  const dispatch = useAppDispatch()

  const settingStatus = useAppSelector(state => state.setting.settingOpenStatus)

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
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>)
}

export default EditProfile
