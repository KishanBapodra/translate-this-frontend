import axios from "axios";
import useUser from "../states/useUser";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { userLoggedIn, logOut } = useUser();

  const handleLogOut = async () => {
    try {
      await axios.post(
        "http://localhost:3333/logout",
        {},
        { withCredentials: true }
      );
      logOut();
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
      <div className="flex-none gap-5">
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
