
import React, { useState } from 'react';

const DevDocs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'api' | 'ui' | 'code'>('architecture');

  const CodeBlock = ({ code, lang }: { code: string, lang: string }) => (
    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm my-4 font-mono shadow-inner border-l-4 border-indigo-500">
      <code>{code}</code>
    </pre>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-3xl shadow-xl border border-gray-100 mt-12 mb-20">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 flex items-center gap-3">
        <span className="bg-indigo-600 p-2 rounded-lg text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </span>
        Android Developer Blueprint
      </h2>

      {/* Tabs */}
      <div className="flex border-b mb-6 overflow-x-auto">
        {(['architecture', 'api', 'ui', 'code'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-bold text-sm uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${activeTab === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-indigo-400'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'architecture' && (
          <div className="animate-fadeIn">
            <h3 className="text-xl font-bold text-indigo-700 mb-2">1. App Architecture (MVVM)</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              For a production-ready app, use the <strong>Model-View-ViewModel (MVVM)</strong> pattern. 
              This separates your UI logic from your business and network logic.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li><strong>Model:</strong> Data classes (TranslationResponse) and Retrofit API services.</li>
              <li><strong>View:</strong> Activity/Fragment (XML Layout + Kotlin/Java code).</li>
              <li><strong>ViewModel:</strong> Handles rotation, network calls, and exposes data via LiveData or StateFlow.</li>
              <li><strong>Repository:</strong> (Optional but recommended) Centralizes data sources (API + Local DB).</li>
            </ul>
          </div>
        )}

        {activeTab === 'api' && (
          <div className="animate-fadeIn">
            <h3 className="text-xl font-bold text-indigo-700 mb-2">2. API Integration Steps</h3>
            <p className="text-gray-600 mb-4">Gemini API uses a simple POST request. Here is the format for your Retrofit implementation:</p>
            
            <h4 className="font-bold text-gray-700 mt-4">API URL:</h4>
            <code className="bg-gray-100 p-1 rounded text-red-600">POST https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=YOUR_API_KEY</code>

            <h4 className="font-bold text-gray-700 mt-4">Sample JSON Payload:</h4>
            <CodeBlock lang="json" code={`{
  "contents": [{
    "parts": [{
      "text": "Translate 'Hello' from English to Spanish. Return ONLY the translation."
    }]
  }]
}`} />

            <h4 className="font-bold text-gray-700 mt-4">Retrofit Interface (Kotlin):</h4>
            <CodeBlock lang="kotlin" code={`interface GeminiApiService {
    @POST("v1beta/models/gemini-3-flash-preview:generateContent")
    suspend fun getTranslation(
        @Query("key") apiKey: String,
        @Body request: GeminiRequest
    ): Response<GeminiResponse>
}`} />
          </div>
        )}

        {activeTab === 'ui' && (
          <div className="animate-fadeIn">
            <h3 className="text-xl font-bold text-indigo-700 mb-2">3. Android UI Structure (XML)</h3>
            <p className="text-gray-600 mb-4">Use <strong>Material Components</strong> and a <strong>ScrollView</strong> to ensure it fits all screens.</p>
            <CodeBlock lang="xml" code={`<!-- res/layout/activity_main.xml -->
<ScrollView ...>
  <LinearLayout orientation="vertical" ...>
    <com.google.android.material.textfield.TextInputLayout ...>
      <TextInputEditText id="@+id/etInput" ... />
    </com.google.android.material.textfield.TextInputLayout>

    <Spinner id="@+id/spSource" ... />
    <Spinner id="@+id/spTarget" ... />

    <MaterialButton id="@+id/btnTranslate" ... />

    <TextView id="@+id/tvOutput" ... />
  </LinearLayout>
</ScrollView>`} />
          </div>
        )}

        {activeTab === 'code' && (
          <div className="animate-fadeIn">
            <h3 className="text-xl font-bold text-indigo-700 mb-2">4. Core Translation Logic</h3>
            <p className="text-gray-600 mb-4">Use a simple function to build the prompt and call the repository.</p>
            <CodeBlock lang="kotlin" code={`// Example Translation Function
fun translate(text: String, from: String, to: String) {
    val prompt = "Translate the following text from $from to $to. Return ONLY the translated text without explanation: $text"
    
    viewModelScope.launch {
        try {
            val response = repository.fetch(prompt)
            _translatedText.value = response.candidates[0].content.parts[0].text
        } catch (e: Exception) {
            _error.value = "Network Error"
        }
    }
}`} />
            
            <div className="bg-orange-50 p-4 border-l-4 border-orange-400 rounded-r-lg mt-6">
              <h4 className="font-bold text-orange-800">Pro Tip: Security</h4>
              <p className="text-sm text-orange-700">Do NOT hardcode your API key in strings.xml. Use <code>BuildConfig</code> or <code>secrets.properties</code> to hide it during development.</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Common Mistakes to Avoid</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex gap-3">
            <span className="text-red-500 font-bold">✕</span>
            <p className="text-sm text-gray-600"><strong>Blocking Main Thread:</strong> Never make API calls on the main thread. Use Coroutines or AsyncTask.</p>
          </div>
          <div className="flex gap-3">
            <span className="text-red-500 font-bold">✕</span>
            <p className="text-sm text-gray-600"><strong>Missing Permissions:</strong> Forgot to add INTERNET and RECORD_AUDIO to AndroidManifest.xml.</p>
          </div>
          <div className="flex gap-3">
            <span className="text-red-500 font-bold">✕</span>
            <p className="text-sm text-gray-600"><strong>Large Payloads:</strong> Sending too much text at once. Always handle truncation for very long strings.</p>
          </div>
          <div className="flex gap-3">
            <span className="text-red-500 font-bold">✕</span>
            <p className="text-sm text-gray-600"><strong>Prompt Leaking:</strong> Not setting the prompt to return "ONLY translated text", causing the AI to talk back.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevDocs;
