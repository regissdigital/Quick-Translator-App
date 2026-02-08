
import React from 'react';
import TranslatorUI from './components/TranslatorUI';
import DevDocs from './components/DevDocs';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 scroll-smooth">
      {/* Header */}
      <header className="text-center mb-10">
        <div className="bg-indigo-600 w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg transform rotate-12">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white -rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-2">Language App Blueprint</h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Experience the translation flow below, then scroll down to see the Android-specific code needed to build it!
        </p>
      </header>

      {/* Simulator Section */}
      <section className="w-full mb-16">
        <h2 className="text-center text-xs font-bold text-indigo-500 uppercase tracking-widest mb-6">Live Simulator</h2>
        <TranslatorUI />
      </section>

      {/* Divider */}
      <div className="w-full max-w-4xl h-px bg-gray-200 my-10 relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50 px-4 text-gray-400 font-bold text-xs uppercase">
          Developer Resources
        </div>
      </div>

      {/* Documentation Section */}
      <DevDocs />

      {/* Footer */}
      <footer className="w-full max-w-4xl text-center py-10 text-gray-400 text-sm">
        <p>© 2024 AI App Builder Academy • Built for Aspiring Android Developers</p>
        <p className="mt-1">Use this guide to jumpstart your Play Store project!</p>
      </footer>
    </div>
  );
};

export default App;
