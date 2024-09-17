import { useForm, SubmitHandler } from "react-hook-form";
import { Input, Button } from "@chakra-ui/react";
import {
  FaRegEye as OpenEye,
  FaRegEyeSlash as SlashedEye,
} from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

type Inputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetch(`${import.meta.env.VITE_API_ENDPOINT}/user/register`, {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.success
          ? toast.success(`${data.message}, Please proceed to login`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            pauseOnHover: false,
            closeOnClick: true,
            draggable: true,
            theme: "colored",
          })
          : toast.error(data.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            pauseOnHover: false,
            closeOnClick: true,
            draggable: true,
            theme: "colored",
          });
        reset({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      });
  };

  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [confirmPasswordShown, setConfirmPasswordShown] =
    useState<boolean>(false);

  const handlePasswordChange = () => {
    setPasswordShown((prev) => !prev);
  };
  const handleConfirmPasswordChange = () => {
    setConfirmPasswordShown((prev) => !prev);
  };
  return (
    <div className="min-h-[500px] tablet:min-h-[800px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 h-[550px]  mx-auto max-w-[400px] flex justify-center mb-10"
      >
        <div className="h-full w-[95%] bg-second text-text flex flex-col  rounded-xl  ">
          <div id="heading" className="flex-col w-full py-2 border-b">
            <div className=" flex justify-center text-4xl  ">Register  <FaRegUserCircle className="ml-2 mt-1 text-4xl inline-block" /> </div>
          </div>
          <div id="fields" className="mx-auto">
            <div id="inputField" className="flex flex-col mt-6">
              <label htmlFor="username" className="text-lg">
                Username
              </label>
              <Input
                type="text"
                autoComplete="username"
                id="username"
                placeholder="johndoe123"
                {...register("username", { required: "Username is required" })}
                className="max-w-[250px]"
              />
              {errors.username && (
                <div className="text-sm text-red-500">
                  {errors.username.message}
                </div>
              )}
            </div>
            <div id="emailField" className="flex flex-col  mt-2">
              <label htmlFor="email" className="text-lg ">
                Email
              </label>
              <Input
                id="email"
                autoComplete="email"
                placeholder="john@gmail.com"
                {...register("email", {
                  required: "Email address is required",
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    message: "Email address is invalid",
                  },
                })}
                className="max-w-[250px]"
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
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message:
                        "Password length must be longer than 8 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Password must not be longer than 20 characters",
                    },
                  })}
                  className="max-w-[250px]"
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
                <div className="text-sm text-red-500 max-w-[230px]">
                  {errors.password.message}
                </div>
              )}
            </div>

            <div id="confirmPasswordField" className="flex flex-col  mt-2">
              <label htmlFor="confirmPassword" className="text-lg ">
                Confirm password
              </label>
              <div className="flex items-center">
                <Input
                  type={confirmPasswordShown ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="********"
                  {...register("confirmPassword", {
                    validate: (val: string) =>
                      watch("password") === val ||
                      "Confirm password do not matches password",
                  })}
                  className="max-w-[250px]"
                />
                {confirmPasswordShown ? (
                  <SlashedEye
                    className="h-6 w-6 ml-2 cursor-pointer"
                    onClick={handleConfirmPasswordChange}
                  />
                ) : (
                  <OpenEye
                    className="h-6 w-6 ml-2 cursor-pointer"
                    onClick={handleConfirmPasswordChange}
                  />
                )}
              </div>
              {errors.confirmPassword && (
                <div className="text-sm text-red-500 max-w-[230px]">
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>
            <div className="text-sm mt-1 text-green-400">
              <span className=""> Already have an account?</span>
              <span
                className="ml-2 hover:cursor-pointer hover:underline  text-yellow-500"
                onClick={() => navigate("/login")}
              >
                Login here
              </span>
            </div>
            <div id="button" className="w-full flex justify-center">
              <Button
                variant="outline"
                colorScheme="cyan"
                type="submit"
                className="text-text border p-2 m-5 hover:text-main"
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
