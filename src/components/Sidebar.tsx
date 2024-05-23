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

        setTextFiles(response.data.translations);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTexts();
  }, [userId]);

  return (
    <div className="bg-base-300 pt-4 px-2 rounded-lg h-full overflow-y-scroll">
      <h2 className="text-lg text-center font-bold mb-4">Translated Texts</h2>
      {textFiles.length === 0 ? (
        <p className="text-center">Go ahead, Translate some</p>
      ) : (
        <ul className="menu text-base-content">
          {textFiles.map((text, index) => (
            <li key={text._id} className="mb-2">
              <Link
                to={`/t/${text._id}`}
                state={{
                  language: text.language,
                  translatedText: text.translatedText[0].text,
                }}
              >
                File {index + 1}: {text.language}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
