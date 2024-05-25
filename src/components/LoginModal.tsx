import axios from "axios";
import { useForm } from "react-hook-form";
import useUser from "../states/useUser";

const LoginModal = () => {
  const { register, handleSubmit, reset } = useForm();
  const { logIn, setUserId } = useUser();
  const handleClose = () => {
    reset();
  };

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(
        "http://localhost:3333/login",
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );

      logIn();
      setUserId(response.data.userId);

      (document.getElementById("login_modal") as HTMLDialogElement).close();
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <dialog id="login_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            onClick={handleClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-2xl">Log In</h3>
        <form
          className="flex flex-col gap-4 mt-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            id="loginEmail"
            className="input input-bordered w-full"
            type="text"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          <input
            id="loginPassword"
            className="input input-bordered w-full"
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          <div className="modal-action mt-3">
            <button type="submit" className="btn">
              Log In
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default LoginModal;
