import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const TranslatedText = () => {
  const { state } = useLocation();
  const [translatedText, setTranslatedText] = useState("");

  useEffect(() => {
    if (state && state.translatedText) {
      setTranslatedText(state.translatedText);
    }
  }, [state]);

  return (
    <div className=" h-full flex flex-col items-center gap-5">
      <h2 className="text-2xl font-bold m-0 mb-4">
        Translated {state.language} Text
      </h2>
      <textarea
        placeholder="Translated text will appear here..."
        className="textarea textarea-bordered textarea-lg h-full w-11/12 max-w-3xl"
        value={translatedText}
        readOnly
      />
    </div>
  );
};

export default TranslatedText;
