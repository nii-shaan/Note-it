import { useForm, SubmitHandler } from "react-hook-form";
import { Input, Button } from "@chakra-ui/react";
import {
  FaRegEye as OpenEye,
  FaRegEyeSlash as SlashedEye,
} from "react-icons/fa";
import { useState } from "react";

type Inputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
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
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 h-[550px]  mx-auto max-w-[400px] flex justify-center"
      >
        <div className="h-full w-[95%] bg-[#102C57] text-text flex flex-col  rounded-xl  ">
          <div id="heading" className="flex justify-center mt-2">
            <h1 className="text-4xl text-second border-b">Register</h1>
          </div>
          <div id="fields" className="mx-auto">
            <div id="inputField" className="flex flex-col mt-6">
              <label htmlFor="username" className="text-lg">
                Username
              </label>
              <Input
                type="text"
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
                      message: "Password length must be 8 characters long",
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
                      watch("password") !== val ||
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
            <div id="showHidePass"></div>
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
    </>
  );
}

export default Register;
