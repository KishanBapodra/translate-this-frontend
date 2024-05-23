import axios from "axios";
import { useEffect, useState } from "react";
import useUser from "../states/useUser";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [textFiles, setTextFiles] = useState([]);
  const { userId } = useUser();

  useEffect(() => {
    const fetchTexts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3333/translations/${userId}`,
          {
            withCredentials: true,
          }
        );
        console.log("Hello: ", response.data.translations);
        setTextFiles(response.data.translations);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTexts();
  }, [userId]);

  return (
    <div className="bg-gray-200 p-4 h-full">
      <h2 className="text-lg font-bold mb-4">Translated Texts</h2>
      {textFiles.length === 0 ? (
        <p>No translated texts available.</p>
      ) : (
        <ul>
          {textFiles.map((text, index) => (
            <li key={text._id} className="mb-2">
              <Link
                to={`/t/${text._id}`}
                state={{ translatedText: text.translatedText[0].text }}
                className="text-blue-500 hover:text-blue-700"
              >
                File {index + 1}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
