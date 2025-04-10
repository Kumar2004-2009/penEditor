import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import Markdown from "react-markdown";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AIPage = () => {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  const navigate = useNavigate();
  
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyCmZEeRVBgKgQ2cTvwk-lbsd0XyP0tueVg",
  });

  const send = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    // Add user message to conversation
    setConversation(prev => [...prev, { role: "user", content: prompt }]);
    
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [{ text: prompt }],
      });
      
      const aiResponse = response.text;
      setOutput(aiResponse);
      // Add AI response to conversation
      setConversation(prev => [...prev, { role: "ai", content: aiResponse }]);
    } catch (error) {
      console.error("Error:", error);
      setConversation(prev => [...prev, { role: "ai", content: "Sorry, an error occurred. Please try again." }]);
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex flex-col h-screen ">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="mr-4 p-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            <FiArrowLeft size={20} />
          </button>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
              <span className="text-blue-600 font-bold text-xl">AI</span>
            </div>
            <h1 className="text-xl font-bold">PenEditor AI</h1>
          </div>
        </div>
      </header>

      {/* Conversation Area */}
      <div className="flex-1 overflow-y-auto p-4 container mx-auto max-w-4xl">
        {conversation.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-blue-600 font-bold text-2xl">AI</span>
            </div>
            <h2 className="text-2xl font-semibold mb-2">How can I help you today?</h2>
            <p className="text-center max-w-md">
              Ask me anything, from creative ideas to technical explanations.
            </p>
          </div>
        ) : (
          conversation.map((message, index) => (
            <div
              key={index}
              className={`mb-6 ${message.role === "user" ? "text-left" : "text-left"}`}
            >
              <div
                className={`inline-block p-4 rounded-lg  ${
                  message.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                <Markdown>{message.content}</Markdown>
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="mb-6 text-left">
            <div className="inline-block p-4 bg-gray-200 text-gray-800 rounded-lg rounded-bl-none max-w-xs md:max-w-md lg:max-w-lg">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-end">
            <div className="flex-1 relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full p-4 pr-12 text-gray-800 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Message Gemini AI..."
                rows="1"
                style={{ minHeight: "60px", maxHeight: "200px" }}
              />
              <button
                onClick={send}
                disabled={!prompt.trim() || loading}
                className={`absolute right-3 bottom-3 p-2 rounded-full ${
                  prompt.trim()
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                } transition-colors`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            PenEditor AI may produce inaccurate information about people, places, or facts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIPage;