
import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { translateText } from '../services/geminiService';

const TranslatorUI: React.FC = () => {
  const [sourceLang, setSourceLang] = useState<string>(Language.Auto);
  const [targetLang, setTargetLang] = useState<string>(Language.English);
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);

  const languages = Object.values(Language);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    try {
      const result = await translateText({ sourceLang, targetLang, text: inputText });
      setOutputText(result);
    } catch (err) {
      alert("Failed to translate. Please check your connection or API key.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    alert("Copied to clipboard!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Translation',
        text: outputText,
      }).catch(console.error);
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  const startListening = () => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; 
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
    };
    recognition.start();
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 mt-4">
      {/* Android Top Bar Mockup */}
      <div className="bg-indigo-600 p-4 flex items-center justify-between text-white">
        <h1 className="font-bold text-lg">Quick Translator</h1>
        <div className="flex gap-2">
           <div className="w-2 h-2 bg-white rounded-full"></div>
           <div className="w-2 h-2 bg-white rounded-full"></div>
           <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Selectors */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Source</label>
            <select 
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="w-full mt-1 p-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Target</label>
            <select 
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="w-full mt-1 p-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              {languages.filter(l => l !== Language.Auto).map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Input Text Area */}
        <div className="relative">
          <textarea
            className="w-full h-32 p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none transition-all"
            placeholder="Type here to translate..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button 
            onClick={startListening}
            className={`absolute bottom-3 right-3 p-2 rounded-full transition-colors ${isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Action Button */}
        <button 
          onClick={handleTranslate}
          disabled={isLoading || !inputText.trim()}
          className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold rounded-xl shadow-lg transform active:scale-95 transition-all flex items-center justify-center"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : "Translate Now"}
        </button>

        {/* Output Text Area */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 min-h-[100px] relative">
          <label className="text-[10px] absolute top-2 left-3 font-bold text-gray-400 uppercase">Translation Result</label>
          <p className="mt-4 text-gray-800 break-words">{outputText || "Your translation will appear here..."}</p>
          
          {outputText && (
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={copyToClipboard} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                  <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                </svg>
              </button>
              <button onClick={handleShare} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="bg-gray-100 p-2 text-center">
        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Powered by Gemini AI</span>
      </div>
    </div>
  );
};

export default TranslatorUI;
