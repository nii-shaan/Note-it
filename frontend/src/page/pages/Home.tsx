import { useAppSelector } from "@/hooks/reduxHooks";
import { USER } from "@/types";
import { fetchEn, capitalize } from "@/utils/user";
import { useEffect, useState } from "react";
import { Typewriter } from 'react-simple-typewriter'
import { Button } from "@/components/ui/button";





function Home() {

  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const [user, setUser] = useState<USER | null>(null)

  const username = user?.username ? capitalize(user.username) : 'Guest';


  useEffect(() => {
    const setCurrentUser = async () => {
      const result = await fetchEn("/api/user/getCurrentUser")
      if (result.success) {
        setUser(result.data)

      }
    }

    if (isLoggedIn) {
      setCurrentUser()
    }
  }, [isLoggedIn])


  if (isLoggedIn) {
    return (<>

      <div className="min-h-[800px]">
        <div id="typewriter" className="w-full h-[100px] flex justify-center items-center text-4xl">
          <Typewriter words={[`Welcome ${username}`]} typeSpeed={100} />
        </div>
        <div id="todoArea">

          <div id="addRemainderButton" className="w-full flex justify-center">
            <Button variant="outline" className="bg-transparent border-third">
              Add new remainder
            </Button>
          </div>

          <div id="todos">

          </div>


        </div>
      </div>


    </>)
  }

  return <div className="min-h-[800px] bg-main">Home</div>;
}

export default Home;
