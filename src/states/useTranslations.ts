import { create } from "zustand";

interface TranslationsState {
  translations: TranslationState[];
  setTranslations: (translations: TranslationState[]) => void;
  addTranslation: (translation: TranslationState) => void;
}
interface TranslationState {
  language: string;
  originalText?: string;
  translatedText: TranslatedTextItem[];
  userId: string;
  _id: string;
}

interface TranslatedTextItem {
  type: string;
  text: string;
}

const useTranslations = create<TranslationsState>((set) => ({
  translations: [],
  setTranslations: (translations: TranslationState[]) => set({ translations }),
  addTranslation: (translation: TranslationState) =>
    set((state) => ({
      translations: [...state.translations, translation],
    })),
}));

export default useTranslations;
