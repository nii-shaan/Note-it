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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
type Inputs = {
  title: string
}
import TodoBlock from "@/components/self/TodoBlock";
import { FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router-dom";






function Home() {
  const navigate = useNavigate()

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


  const queryClient = useQueryClient()
  const { mutate, isPending: mutatePending } = useMutation({
    mutationFn: (payload: { title: string }) => {
      return fetch("/api/todos/createTodo", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    }
  })


  const onSubmit: SubmitHandler<Inputs> = (d) => {
    mutate(d)
    setOpen(false)
    reset()

  }

  const { data: todos, isPending, isSuccess } = useQuery({
    queryKey: ['todos'], queryFn: function() {
      return fetchEn("/api/todos/getAllTodos")
    }
  })



  if (isLoggedIn) {
    return (<>

      <div className="min-h-[800px]">
        <div id="typewriter" className="w-full h-[100px] flex justify-center items-center text-4xl">
          <Typewriter words={[`Welcome ${username}`]} typeSpeed={100} />
        </div>
        <div id="todoArea" className="mt-6">
          <div id="addRemainderButton" className="w-full flex justify-center">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <div id='Title' className='h-[30%] flex justify-center items-center'>
                  <Button
                    variant="outline"
                    className="bg-transparent border-third">
                    {mutatePending ? "Adding new remainder" : (<>
                      Create new remainder <IoAdd className="inline-block text-3xl ml-2" /></>)}
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

          <div id="todos" className="flex items-center justify-center my-5">
            <div className="bg-second p-4 rounded-lg">
              {!isPending && isSuccess && todos.data?
                todos.data.length <= 0 ? (
                  <div className="text-green-500">No Remainders</div>
                ) : (
                  todos.data.map((todo: TODO) => (
                    <TodoBlock key={todo._id} todo={todo} />
                  ))) : (
                  <div>Loading..</div>
                )}
            </div>
          </div>


        </div>
      </div>


    </>)
  }

  return (
    <div className="min-h-[800px] bg-main">
      <div id="head" className="red-100 text-xl mt-16">
        <div className="w-[300px] tablet:w-[600px] mx-auto flex flex-col 
        items-center justify-center  tablet:flex-row tablet:justify-normal 
        pc:w-[1025px] pc:text-4xl">
          <p className="inline-block">Welcome to NoteIt</p>
          <div className="font-bold inline-block ml-4">
            <Typewriter words={["--Your Personal Note & Task Manager"]} typeSpeed={100} cursor />
          </div>
        </div>
        <div id="button" className="w-full flex justify-center mt-8">
          <div className="relative group">
            <div
              className="relative w-64 h-14 opacity-90 overflow-hidden rounded-xl bg-black z-10"
            >
              <div
                className="absolute z-10 -translate-x-44 group-hover:translate-x-[30rem]
                ease-in transistion-all duration-700 h-full 
                w-44 bg-gradient-to-r from-gray-500 to-white/10 opacity-30 -skew-x-12"
              ></div>

              <div
                className="absolute flex items-center justify-center text-white 
                z-[1] opacity-90 rounded-2xl inset-0.5 bg-black"
              >
                <button
                  name="text"
                  className="input font-semibold text-lg h-full opacity-90 w-full  rounded-xl bg-black flex justify-center items-center"
                  onClick={() => { navigate("/register") }}
                >
                  Get Started
                  <FiLogIn className="inline-block text-4xl ml-1" />

                </button>
              </div>
              <div
                className="absolute duration-1000 group-hover:animate-spin
                w-full h-[100px] bg-gradient-to-r from-third to-third blur-[30px]"
              ></div>
            </div>
          </div>


        </div>

      </div>

    </div>
  )
};

export default Home;
