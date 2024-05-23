import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TranslateText from "./components/TranslateText";
import TranslatedText from "./components/TranslatedText";
import Sidebar from "./components/Sidebar";
import useUser from "./states/useUser";

function App() {
  const { userLoggedIn } = useUser();

  return (
    <Router>
      <div className="h-screen flex flex-col">
        <div>
          <Navbar />
        </div>
        <div className="flex flex-1 justify-center">
          {userLoggedIn && (
            <div className="hidden sm:block w-1/5 m-8">
              <Sidebar />
            </div>
          )}
          <div className="w-full sm:w-4/5 sm:p-4">
            <Routes>
              <Route path="/" element={<TranslateText />} />
              <Route path="/t/:id" element={<TranslatedText />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
