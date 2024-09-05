import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@chakra-ui/react";
import { IoAdd } from "react-icons/io5";


function AddNote() {
	return (
		<>
			<Dialog>
				<DialogTrigger>
					<div className='border border-secondText h-[150px] w-[150px] rounded-lg py-2 px-1 text-text cursor-pointer hover:bg-second hover:scale-95 transition ease-in-out duration-200 mx-auto mt-10 pc:ml-5'>
						<div id='icon' className='w-full h-[70%] flex items-center justify-center text-[100px]'>
							<IoAdd />

						</div>

						<div id='Title' className='h-[30%] flex justify-center items-center'>
							Create new Note
						</div>
					</div>
				</DialogTrigger>
				<DialogContent className="bg-second text-text rounded-xl text-sm">
					<DialogHeader>
						<DialogTitle>Create new Note</DialogTitle>
					</DialogHeader>

					<div className="my-4 flex justify-center gap-x-3 pc:gap-x-6">

						<label htmlFor="title" className="font-bold text-2xl">Title</label>
						<input id="title" className="bg-transparent border-2 text-center outline-none rounded-lg py-1 focus:border-green-300" />
					</div>
					<div className="flex justify-center gap-x-5">
						<DialogClose>
							<Button colorScheme="red" variant="outline">Cancel</Button>
						</DialogClose>
						<Button colorScheme="green" variant="outline">Create</Button>
					</div>

				</DialogContent>
			</Dialog>


		</>
	)
}

export default AddNote
