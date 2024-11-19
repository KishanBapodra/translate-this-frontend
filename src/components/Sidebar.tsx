import axios from "axios";
import { useEffect } from "react";
import useUser from "../hooks/useUser";
import { Link } from "react-router-dom";
import useTranslations from "../hooks/useTranslations";

const Sidebar = () => {
  const { translations, setTranslations } = useTranslations();
  const userId = useUser((state) => state.userId);

  useEffect(() => {
    const fetchTexts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.BASE_URL}/translations/${userId}`,
          {
            withCredentials: true,
          }
        );
        setTranslations(response.data.translations);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTexts();
  }, [userId, setTranslations]);

  return (
    <div className="bg-base-300 pt-4 px-2 rounded-lg h-full overflow-y-scroll">
      <h2 className="text-lg text-center font-bold mb-4">Translated Texts</h2>
      {translations.length === 0 ? (
        <p className="text-center">Go ahead, Translate some</p>
      ) : (
        <ul className="menu text-base-content">
          {translations.map((text, index) => (
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
