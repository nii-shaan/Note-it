import { useAppSelector } from "@/hooks/reduxHooks";
import { USER, TODO } from "@/types";
import { fetchEn, capitalize } from "@/utils/user";
import { useEffect, useState } from "react";
import { Typewriter } from 'react-simple-typewriter'
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { IoAdd } from "react-icons/io5";
import { useForm, SubmitHandler } from "react-hook-form"
import { useQuery } from "@tanstack/react-query";
type Inputs = {
  title: string
}
import TodoBlock from "@/components/self/TodoBlock";






function Home() {
  const [open, setOpen] = useState(false);
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const [user, setUser] = useState<USER | null>(null)
  const username = user?.username ? capitalize(user.username) : 'Guest';



  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (d) => {

    setOpen(false)
    reset()

  }

  const { data, isPending, isSuccess } = useQuery({
    queryKey: ['todos'], queryFn: function() {
      return fetchEn("/api/todos/getAllTodos")
    }
  })
  console.log(data)



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
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <div id='Title' className='h-[30%] flex justify-center items-center'>
                  <Button
                    variant="outline"
                    className="bg-transparent border-third">
                    Create new remainder <IoAdd className="inline-block text-3xl ml-2" />
                  </Button>
                </div>
              </DialogTrigger>
              <DialogContent className="bg-second text-text rounded-xl text-sm">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <DialogHeader>
                    <DialogTitle>Create new Remainder</DialogTitle>
                    <DialogDescription />
                  </DialogHeader>

                  <div className="my-4 flex justify-center gap-x-3 pc:gap-x-6">

                    <label htmlFor="title" className="font-bold text-2xl">Remainder</label>
                    <div className="flex flex-col">


                      <input id="title" {...register("title", {
                        required: "Remainder is required !",
                      })} className="bg-transparent border-2 text-center outline-none rounded-lg py-1 focus:border-green-500" />
                      {errors.title && <span className="text-red-500 mt-1 mx-auto">{errors.title.message}</span>}
                    </div>
                  </div>
                  <div className="flex justify-center gap-x-5">
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        className="bg-transparent border-red-500" onClick={() => { reset() }}>Cancel</Button>
                    </DialogClose>
                    <Button variant="outline" className="bg-transparent border-green-500" type="submit">Create</Button>
                  </div>

                </form>
              </DialogContent>
            </Dialog>


          </div>

          <div id="todos" className="bg-red-300 flex items-center justify-center">
            <div className="bg-green-200">
              {!isPending ? (data.data.map((todo: TODO) => (
                <TodoBlock key={todo._id} todo={todo} />
              ))) : (<div>Loading</div>)}
            </div>
          </div>


        </div>
      </div>


    </>)
  }

  return <div className="min-h-[800px] bg-main">Home</div>;
}

export default Home;
