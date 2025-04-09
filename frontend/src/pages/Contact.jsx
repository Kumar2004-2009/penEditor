import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

const Contact = () => {
  const formRef = useRef();
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_2myyjk9",     // Your EmailJS Service ID
        "template_enk54jn",    // Your EmailJS Template ID
        formRef.current,
        "lMo4SGHCSWM_eJR3P"    // Your Public Key
      )
      .then(
        () => {
          setSent(true);
          formRef.current.reset();
        },
        (error) => {
          alert("Failed to send message. Try again later.");
          console.error(error.text);
        }
      );
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-[#1c1c1c] p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">📩 Contact Us</h2>

        <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
          <div>
            <label className="block mb-2 text-gray-300">Your Name</label>
            <input
              type="text"
              name="user_name"
              required
              className="w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">Message</label>
            <textarea
              name="message"
              rows="5"
              required
              className="w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-md outline-none resize-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 py-3 rounded-md font-semibold"
          >
            Send Message
          </button>

          {sent && (
            <p className="text-green-400 text-center mt-4">
              ✅ Message sent successfully!
            </p>
          )}
        </form>
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white rounded-md font-medium transition duration-300"
      >
        Back to Editor
      </button>
    </div>
  );
};

export default Contact;
