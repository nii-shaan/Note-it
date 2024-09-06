

interface NOTEBLOCK {
	title: string
}


function NoteBlock({ title }: NOTEBLOCK) {
	return (
		<div className='border border-secondText h-[150px] w-[150px] rounded-lg py-2 px-1 text-text cursor-pointer hover:bg-second hover:scale-95 transition ease-in-out duration-200 inline-block'>

			<div id="noteTitle" className="w-full text-center">
				{title}
			</div>


		</div>
	)
}

export default NoteBlock
