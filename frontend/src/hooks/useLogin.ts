import { useMutation } from "@tanstack/react-query";

interface Login {
  email: string;
  password: string;
}

const loginUser = async ({ email, password }: Login) => {
  const response = await fetch(`/api/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });
  return await response.json();
};

export const useLoginUser = () => {
  const mutation = useMutation({
    mutationFn: loginUser,
  });
  return mutation;
};
