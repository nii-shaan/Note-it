import { IoAdd } from "react-icons/io5";


function AddNote() {
	return (
		<>

			<div className='border border-secondText h-[150px] w-[150px] rounded-lg py-2 px-1 text-text cursor-pointer hover:bg-second hover:scale-95 transition ease-in-out duration-200'>
				<div id='icon' className='w-full h-[70%] flex items-center justify-center text-[100px]'>
					<IoAdd />

				</div>

				<div id='Title' className='h-[30%] flex justify-center items-center'>
					Create new Note
				</div>
			</div>
		</>
	)
}

export default AddNote
