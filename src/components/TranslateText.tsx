import axios from "axios";
import { useState } from "react";
import useUser from "../states/useUser";
import { useNavigate } from "react-router-dom";
import useTranslations from "../states/useTranslations";

const TranslateText = () => {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("Hindi");
  const userId = useUser((state) => state.userId);
  const addTranslation = useTranslations((state) => state.addTranslation);
  const navigate = useNavigate();

  const handleTranslate = async () => {
    if (!userId) {
      alert("Please login to translate the text");
      return;
    }

    const response = await axios.post(
      "http://localhost:3333/translate",
      {
        originalText: text,
        language,
        userId,
      },
      { withCredentials: true }
    );

    const { translatedText, id } = response.data;
    addTranslation({
      language,
      originalText: text,
      translatedText,
      userId,
      _id: id,
    });

    navigate(`/t/${id}`, {
      state: { language, translatedText: translatedText[0].text },
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <div className=" h-full flex flex-col items-center gap-5">
      <textarea
        placeholder="Enter text to translate..."
        className="textarea textarea-bordered textarea-lg h-5/6 w-11/12 max-w-3xl"
        value={text}
        onChange={handleTextChange}
      />
      <div className="flex justify-center sm:justify-end w-11/12 max-w-3xl">
        <select
          className="select select-bordered mr-2"
          defaultValue={language}
          onChange={handleLanguageChange}
        >
          <option value="Hindi">Hindi</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="Arabic">Arabic</option>
          <option value="Malyalam">Malyalam</option>
          <option value="Gujarati">Gujarati</option>
        </select>
        <button
          onClick={handleTranslate}
          className="btn btn-primary btn-md ml-4"
        >
          Translate
        </button>
      </div>
    </div>
  );
};

export default TranslateText;
