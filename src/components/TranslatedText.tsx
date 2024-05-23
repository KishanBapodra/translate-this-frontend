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
    <div className="h-5/6 flex flex-col justify-center items-center gap-5">
      <h2 className="text-lg font-bold mb-4">
        Translated {state.language} Text
      </h2>
      <textarea
        placeholder="Translated text will appear here..."
        className="textarea textarea-bordered textarea-lg h-5/6 w-11/12 max-w-3xl"
        value={translatedText}
        readOnly
      />
    </div>
  );
};

export default TranslatedText;
