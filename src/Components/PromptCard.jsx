import React, { useState } from "react";
import axios from "axios";

import { IoIosArrowDropupCircle } from "react-icons/io";

function PromptCard() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const handleButtonClick = async () => {
    if (input.length < 1) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: "text-davinci-003",
          prompt: `Create a 5-line bio with emojis for someone who is a ${input}. The bio should be creative and inspirational. Here are some examples:
          1. 🌐 syedahmedraza.com 💻 Web developer 🚀 Aiming for Billionaire 📚 Always Learning & Growing 💡 Exploring New Frontiers in Tech, Business & Innovation
          2. 🎨 Creative Designer 🌟 Passionate About Art 🖼️ Bringing Ideas to Life 🌍 Changing the World One Design at a Time 💪 Ready for New Challenges
          3. 💼 Business Strategist 📈 Driving Growth & Innovation 🌟 Leading with Vision 🚀 Transforming Ideas into Success 💡 Inspiring Future Leaders`,
          max_tokens: 100,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer `,
            "Content-Type": "application/json",
          },
        }
      );

      setOutput(response.data.choices[0].text.trim());
    } catch (error) {
      console.error("Error generating bio:", error);
      setOutput("Sorry, something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-[500px] h-[400px] flex flex-col items-center ">
      {/* prompt bar */}
      <div className="relative w-full">
        <input
          type="text"
          onKeyUp={(e) => {
            let key = e.key;
            if (key === "Enter") {
              handleButtonClick();
            }
          }}
          value={input}
          autoFocus
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          className="w-full outline-none p-2 pl-5 pr-10 rounded-full border border-gray-600 bg-gray-900 text-white"
          placeholder="Enter your prompt"
        />
        <button
          onClick={handleButtonClick}
          disabled={loading || input.length < 1}
          className="absolute disabled:text-gray-600 top-1/2 right-3 transform -translate-y-1/2 text-blue-500"
        >
          <IoIosArrowDropupCircle size={25} />
        </button>
      </div>

      {/* output bar with loader */}
      <div className="mt-6 w-full flex flex-col items-start">
        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        )}
        {!loading && (
          <div className=" w-full">
            <p className="text-white">{output}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PromptCard;
