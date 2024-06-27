import { useForm, SubmitHandler } from "react-hook-form";
import { Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import {
  FaRegEye as OpenEye,
  FaRegEyeSlash as SlashedEye,
} from "react-icons/fa";
import { toast } from "react-toastify";

type Inputs = {
  email: String;
  password: String;
};

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const handlePasswordChange = () => {
    setPasswordShown((prev) => !prev);
  };
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    fetch(`${import.meta.env.VITE_API_ENDPOINT}/user/login`, {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <>
      <form
        action=""
        className=" mt-10 h-[350px]  mx-auto max-w-[400px] flex justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="bg-[#102C57] h-full w-[95%] mx-auto flex flex-col  rounded-xl text-text">
          <div id="title" className="flex justify-center mt-2">
            <h1 className="text-4xl text-second border-b">Login</h1>
          </div>
          <div id="fields" className="  mx-auto">
            <div id="emailField" className="flex flex-col mt-6">
              <label htmlFor="emailAdd" className="text-lg">
                Email
              </label>
              <Input
                id="emailAdd"
                type="text"
                className="max-w-[250px]"
                {...register("email", {
                  required: "Please enter email address",
                })}
              />
              {errors.email && (
                <div className="text-sm text-red-500">
                  {errors.email.message}
                </div>
              )}
            </div>
            <div id="passwordField" className="flex flex-col  mt-2">
              <label htmlFor="password" className="text-lg ">
                Password
              </label>
              <div className="flex items-center">
                <Input
                  type={passwordShown ? "text" : "password"}
                  id="password"
                  placeholder="********"
                  className="max-w-[250px]"
                  {...register("password", {
                    required: "Please enter password",
                  })}
                />
                {passwordShown ? (
                  <SlashedEye
                    className="h-6 w-6 ml-2 cursor-pointer"
                    onClick={handlePasswordChange}
                  />
                ) : (
                  <OpenEye
                    className="h-6 w-6 ml-2 cursor-pointer"
                    onClick={handlePasswordChange}
                  />
                )}
              </div>
              {errors.password && (
                <div className="text-sm text-red-500">
                  {errors.password.message}
                </div>
              )}
              {}
            </div>
            <div id="button" className="w-full flex justify-center">
              <Button
                variant="outline"
                colorScheme="cyan"
                type="submit"
                className="text-text border p-2 m-5 hover:text-main"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
