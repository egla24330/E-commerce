import React, { useState, useRef, useEffect,useContext } from "react";
import { FiMessageSquare, FiX } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import { ShopContext } from "../context/Shopcontext";
const Chatbot = () => {
  const {AI} = useContext(ShopContext);
  console.log({AI})
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef(null);

  const platformInfo = `
You are a helpful assistant for YegnaCart, an Ethiopian-based e-commerce platform. YegnaCart connects local sellers and buyers through a secure, reliable, and user-friendly shopping experience.

📦 Users can buy electronics, fashion, home decor, construction materials, books, automotive parts, beauty products, and more.

💳 After checkout, users upload bank receipts to verify payments. If a product is not yet verified, the assistant should show a warning icon and guide users to click "Verify" at the top right to upload their receipt.

💸 NetMarket System: Users registered under someone can earn coins when they buy goods. 1 coin = 0.25 ETB. To request withdrawals: click the profile icon → My Profile → Withdrawal Request → Fill in coin amount, Account Holder Name, Phone Number, and Bank Account Number  and minimum Withdrawal coin is 999 coins.

🛠️ Built & Maintained by Datora — a digital studio founded by Abdi Gemechu and Betel Syoum. Our mission is to empower local businesses through modern digital commerce. We value innovation, impact, and quality engineering.

Keep responses friendly, simple, and helpful.
`;

const speak = (text) => {
    if (synth.speaking) synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    synth.speak(utterance);
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Your browser doesn't support voice input.");

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setInputText(speechText);
    };
    recognition.start();
  };


  const scrollToBottom = () => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = inputText.trim();
    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setInputText("");
    setIsLoading(true);

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "Content-Type": "application/json",
          "HTTP-Referer": "https://e-commerce-backend-bo7f.onrender.com",
          "X-Title": "YegnaCart Chatbot"
        },
        body: JSON.stringify({
          "model": "deepseek/deepseek-r1-0528:free",
          "messages": [
            { "role": "user", "content": `${platformInfo}\nUser: ${userMessage}` }
          ]
        })
      });

      const data = await res.json();
      const fullResponse = data.choices[0].message.content;

      // Simulate word-by-word typing
      let display = "";
     
      const words = fullResponse.split(" ");
      for (let i = 0; i < words.length; i++) {
        await new Promise((r) => setTimeout(r, 25));
        display += words[i] + " ";
        setMessages((prev) => [
          ...newMessages,
          { role: "assistant", content: display.trim() }
        ]);
      }


    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Sorry, something went wrong." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-transform duration-200 hover:scale-110"
      >
        {open ? <FiX size={22} /> : <FiMessageSquare size={22} />}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 w-[360px] max-h-[500px] bg-white border shadow-xl rounded-xl flex flex-col overflow-hidden z-50">
          <div className="bg-indigo-600 text-white px-4 py-2 font-semibold">
            YegnaCart Assistant
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-3 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`px-3 py-2 rounded-lg max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-indigo-100 text-indigo-900 self-end ml-auto"
                    : "bg-gray-100 text-gray-800 self-start mr-auto"
                }`}
              >
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            ))}
            {isLoading && (
              <p className="text-xs italic text-gray-400">Typing...</p>
            )}
            <div ref={chatRef} />
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 border-t px-3 py-2">
        <button
          type="button"
          onClick={handleVoiceInput}
          className="text-xl text-gray-600 hover:text-indigo-500"
        >
          🎙️
        </button>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a question..."
          className="flex-1 text-sm px-3 py-2 border rounded-full outline-none"
        />
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full text-sm"
        >
          Send
        </button>
      </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
