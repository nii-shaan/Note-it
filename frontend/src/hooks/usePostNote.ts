

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from "react-toastify";


const postNote = async (data: { title: string }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/notes/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
    const result = await response.json()
    if (result.success) {
      toast.success(`Note created: ${result.data.title}`)
    } else {
      toast.error(`FAILED! ${result.message}`)
    }
  }
  catch (e) {
    toast.error("Something went wrong!")
  }
}


export const usePostNote = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: postNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] })
    }
  })
  return mutation;
}
