import { useAppDispatch } from "../../hooks/ReduxHooks"
import { turnOffLoader } from "../../store/loader.slice"

function Home() {
  const dispatch =useAppDispatch()
  dispatch(turnOffLoader())
  return (
    <div className='h-[1200px]'>Home</div>
  )
}

export default Home