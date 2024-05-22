import axios from "axios";
import { useState } from "react";
import useUser from "../states/useUser";

const TranslateText = () => {
  const [text, setText] = useState("");
  const { userId } = useUser();

  const handleTranslate = async () => {
    const response = await axios.post(
      "http://localhost:3333/translate",
      {
        originalText: text,
        language: "hindi",
        userId: userId,
      },
      { withCredentials: true }
    );
    console.log("translatedText: ", response.data.translatedText[0].text);
  };

  const handleTextChange = (e: any) => {
    setText(e.target.value);
  };

  return (
    <div className=" h-5/6 flex flex-col justify-center items-center gap-5">
      <textarea
        placeholder="Enter text to translate..."
        className="textarea textarea-bordered textarea-lg h-4/6 w-4/6 max-w-3xl"
        value={text}
        onChange={handleTextChange}
      />
      <div className="flex justify-end w-4/6 max-w-3xl">
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
