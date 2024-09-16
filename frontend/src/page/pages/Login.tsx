import { useForm, SubmitHandler } from "react-hook-form";
import { Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import {
  FaRegEye as OpenEye,
  FaRegEyeSlash as SlashedEye,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { useLoginUser } from "@/hooks/useLogin";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { login } from "@/store/Auth.slice";

type Inputs = {
  email: string;
  password: string;
};

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const handlePasswordChange = () => {
    setPasswordShown((prev) => !prev);
  };
  const { mutate, isPending } = useLoginUser();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(data, {
      onSuccess: (data) => {
        
        if (data.isAuthenticated) {
          dispatch(login());
          navigate("/");
          toast.success("Login Success");
        } else {
          toast.error(data.message)
        }
      },
    });
    reset({ email: "", password: "" });
  };
  return (
    <>
      <form
        action=""
        className=" mt-10 h-[350px]  mx-auto max-w-[400px] flex justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="bg-second h-full w-[95%] mx-auto flex flex-col  rounded-xl text-text">
          <div id="heading" className="flex-col w-full py-2 border-b">
            <div className=" flex justify-center items-center text-4xl text-text ">
              Login <CiLogin className="text-[50px]" />
            </div>
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
            <div className="text-sm mt-1 text-green-400">
              <span className="">New user?</span>
              <span
                className="ml-2 hover:cursor-pointer hover:underline  text-yellow-500"
                onClick={() => navigate("/register")}
              >
                Register here
              </span>
            </div>
            <div id="button" className="w-full flex justify-center">
              <Button
                variant="outline"
                colorScheme="cyan"
                type="submit"
                className="text-text border p-2 m-5 hover:text-main "
              >
                {isPending ? "Logging in..." : "Login"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
