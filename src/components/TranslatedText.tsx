import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const TranslatedText = () => {
  const { state } = useLocation();
  const [translatedText, setTranslatedText] = useState("");

  useEffect(() => {
    const getTranslatedText = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3333/translation/${userId}`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (state && state.translatedText) {
      setTranslatedText(state.translatedText);
    } else {
      getTranslatedText();
    }
  }, [state]);

  return (
    <div className="h-5/6 flex flex-col justify-center items-center gap-5">
      <textarea
        placeholder="Translated text will appear here..."
        className="textarea textarea-bordered textarea-lg h-4/6 w-4/6 max-w-3xl"
        value={translatedText}
        readOnly
      />
    </div>
  );
};

export default TranslatedText;
