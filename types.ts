
export interface TranslationRequest {
  sourceLang: string;
  targetLang: string;
  text: string;
}

export interface TranslationResponse {
  translatedText: string;
  error?: string;
}

export enum Language {
  Auto = "Auto-detect",
  English = "English",
  Hindi = "Hindi",
  Marathi = "Marathi",
  Gujarati = "Gujarati",
  Tamil = "Tamil",
  Telugu = "Telugu",
  Bengali = "Bengali",
  Punjabi = "Punjabi",
  Kannada = "Kannada",
  Malayalam = "Malayalam",
  Spanish = "Spanish",
  French = "French",
  German = "German",
  Italian = "Italian",
  Portuguese = "Portuguese",
  Russian = "Russian",
  Arabic = "Arabic",
  ChineseSimp = "Chinese (Simplified)",
  ChineseTrad = "Chinese (Traditional)",
  Japanese = "Japanese",
  Korean = "Korean",
  Dutch = "Dutch",
  Turkish = "Turkish",
  Vietnamese = "Vietnamese",
  Thai = "Thai"
}
