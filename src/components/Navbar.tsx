import axios from "axios";
import useUser from "../hooks/useUser";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const userLoggedIn = useUser((state) => state.userLoggedIn);
  const logOut = useUser((state) => state.logOut);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await axios.post(
        "http://localhost:3333/logout",
        {},
        { withCredentials: true }
      );
      logOut();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <nav className="navbar p-3 sm:py-6 sm:px-8 bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost text-3xl" to={"/"}>
          TranslateThis
        </Link>
      </div>
      <div className="gap-5">
        <Link className="btn px-2 text-lg" to={"/"}>
          Home
        </Link>
        {!userLoggedIn ? (
          <>
            <button
              onClick={() => {
                (
                  document.getElementById("register_modal") as HTMLDialogElement
                ).showModal();
              }}
              className="btn px-2 text-lg"
            >
              Sign up
            </button>

            <button
              onClick={() => {
                (
                  document.getElementById("login_modal") as HTMLDialogElement
                ).showModal();
              }}
              className="btn px-2 text-lg"
            >
              Log In
            </button>
          </>
        ) : (
          <button onClick={handleLogOut} className="btn px-2 text-lg">
            Log Out
          </button>
        )}
        <RegisterModal />
        <LoginModal />
      </div>
    </nav>
  );
};

export default Navbar;
