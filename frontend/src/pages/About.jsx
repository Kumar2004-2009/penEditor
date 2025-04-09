import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-6 md:px-20 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About PenEditor</h1>

        <p className="text-lg text-gray-300 mb-6">
          <span className="text-blue-500 font-semibold">PenEditor</span> is your modern, real-time coding playground designed for web developers and creators. Whether you're experimenting with ideas or building full web components, PenEditor gives you an instant, flexible, and intuitive experience for writing <strong>HTML, CSS, and JavaScript</strong>.
        </p>

        <p className="text-lg text-gray-300 mb-6">
          It’s inspired by platforms like CodePen but enhanced with a cleaner UI, auto-saving, live preview, and a focus on speed and simplicity. You don’t need to set up any local environment—just open and start coding!
        </p>

        <hr className="border-gray-700 my-10" />

        <h2 className="text-2xl font-semibold mb-4 text-white">🧠 Smart AI Integration</h2>

        <p className="text-lg text-gray-300 mb-4">
          Stuck while coding? Don’t worry—<span className="text-blue-400 font-medium">PenEditor now includes built-in AI assistance</span> right inside the editor.
        </p>

        <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
          <li>Get instant suggestions for HTML/CSS/JS snippets</li>
          <li>Ask the AI questions without leaving the editor</li>
          <li>No need to switch tabs to open ChatGPT or other tools</li>
          <li>Faster debugging, smarter autocomplete (coming soon!)</li>
        </ul>

        <p className="text-lg text-gray-300 mb-12">
          The goal is to help developers learn, create, and solve problems—all in one seamless environment.
        </p>

        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 cursor-pointer hover:bg-blue-700 px-6 py-3 text-white rounded-md font-medium transition duration-300"
        >
          Back to Editor
        </button>
      </div>
    </div>
  );
};

export default About;
