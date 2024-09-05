import {
	Dialog,
	DialogClose,
	DialogDescription,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@chakra-ui/react";
import { IoAdd } from "react-icons/io5";
import { useForm, SubmitHandler } from "react-hook-form"
import { useState } from "react";
type Inputs = {
	title: string
}



function AddNote() {
	const [open, setOpen] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Inputs>()


	const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log(data)
		setOpen(false)
		reset()

	}

	return (
		<>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger className="w-full">
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
					<form onSubmit={handleSubmit(onSubmit)}>
						<DialogHeader>
							<DialogTitle>Create new Note</DialogTitle>
							<DialogDescription />
						</DialogHeader>

						<div className="my-4 flex justify-center gap-x-3 pc:gap-x-6">

							<label htmlFor="title" className="font-bold text-2xl">Title</label>
							<div className="flex flex-col">


								<input id="title" {...register("title", {
									required: "Title is required !",
									pattern: {
										value: /^[a-zA-Z0-9_-]+$/,
										message: "'-', '_', Alphabets & Numbers only!"
									}
								})} className="bg-transparent border-2 text-center outline-none rounded-lg py-1 focus:border-green-300" />
								{errors.title && <span className="text-red-500 mt-1 mx-auto">{errors.title.message}</span>}
							</div>
						</div>
						<div className="flex justify-center gap-x-5">
							<DialogClose asChild>
								<Button colorScheme="red" variant="outline">Cancel</Button>
							</DialogClose>
							<Button colorScheme="green" variant="outline" type="submit">Create</Button>
						</div>

					</form>
				</DialogContent>
			</Dialog>


		</>
	)
}

export default AddNote
