import axios from "axios";
import { useForm } from "react-hook-form";
import useUser from "../hooks/useUser";
import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const RegisterModal = () => {
  const { register, handleSubmit, reset } = useForm();

  const logIn = useUser((state) => state.logIn);
  const setUserId = useUser((state) => state.setUserId);
  const [showPassword, setShowPassword] = useState(false);

  const handleClose = () => {
    reset();
  };

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(
        "http://localhost:3333/register",
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );

      logIn();
      setUserId(response.data.userId);

      (document.getElementById("register_modal") as HTMLDialogElement).close();
      reset();
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <dialog id="register_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            onClick={handleClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-2xl">Sign Up</h3>
        <form
          className="flex flex-col gap-4 mt-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            id="name"
            className="input input-bordered w-full"
            type="text"
            placeholder="Name"
            {...register("name", { required: true })}
          />
          <input
            id="registerEmail"
            className="input input-bordered w-full"
            type="text"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          <div className="relative">
            <input
              id="registerPassword"
              className="input input-bordered w-full"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", { required: true })}
            />
            <button
              type="button"
              className="absolute text-xl right-2 top-1/2 -translate-y-1/2"
              onClick={toggleShowPassword}
            >
              {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </button>
          </div>
          <div className="modal-action mt-3">
            <button type="submit" className="btn">
              Signup
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default RegisterModal;
