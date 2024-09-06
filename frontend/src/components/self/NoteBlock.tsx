

interface NOTEBLOCK {
	title: string
}


function NoteBlock({ title }: NOTEBLOCK) {
	return (
		<div>{title}</div>
	)
}

export default NoteBlock
