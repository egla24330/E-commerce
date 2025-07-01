import React, { useState, useRef, useEffect, useContext } from "react";
import { FiMessageSquare, FiX, FiMic, FiStar } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import { ShopContext } from "../context/Shopcontext";
 import { Send } from 'lucide-react';


const Chatbot = () => {
  const { AI } = useContext(ShopContext);
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([
    { 
      role: "assistant", 
      content: "👋 Hello! I'm Zay, your Zaycommerce assistant. How can I help you today?" 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatRef = useRef(null);
  const synthRef = useRef(null);

  // Starry gradient background pattern (base64 encoded SVG)
  const starPattern = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M10,10 Q15,5 20,10 T30,10 Q35,5 40,10 T50,10 Q55,5 60,10 T70,10 Q75,5 80,10 T90,10'/%3E%3Ccircle cx='20' cy='80' r='0.8'/%3E%3Ccircle cx='25' cy='65' r='0.6'/%3E%3Ccircle cx='70' cy='30' r='1'/%3E%3Ccircle cx='80' cy='90' r='0.5'/%3E%3Ccircle cx='45' cy='35' r='0.7'/%3E%3Ccircle cx='30' cy='50' r='0.4'/%3E%3Ccircle cx='90' cy='60' r='0.9'/%3E%3Ccircle cx='60' cy='15' r='0.5'/%3E%3Ccircle cx='15' cy='25' r='0.6'/%3E%3C/g%3E%3C/svg%3E";

  const platformInfo = `
You are a helpful assistant for Zaycommerce, an Ethiopian-based e-commerce platform. Zaycommerce connects local sellers and buyers through a secure, reliable, and user-friendly shopping experience.

📦 Users can buy electronics, fashion, home decor, construction materials, books, automotive parts, beauty products, and more.

💳 After checkout, users upload bank receipts to verify payments. If a product is not yet verified, the assistant should show a warning icon and guide users to click "Verify" at the top right to upload their receipt.

💸 NetMarket System: Users registered under someone can earn coins when they buy goods. 1 coin = 0.25 ETB. To request withdrawals: click the profile icon → My Profile → Withdrawal Request → Fill in coin amount, Account Holder Name, Phone Number, and Bank Account Number  and minimum Withdrawal coin is 999 coins.

🛠️ Built & Maintained by Datora — a digital studio founded by Abdi Gemechu and Betel Syoum. Our mission is to empower local businesses through modern digital commerce. We value innovation, impact, and quality engineering.

Keep responses friendly, simple, and helpful.
`;

  /*useEffect(() => {
    synthRef.current = window.speechSynthesis;
    return () => {
      if (synthRef.current.speaking) {
        synthRef.current.cancel();
      }
    };
  }, []);
*/
  const speak = (text) => {
    if (!synthRef.current) return;
    if (synthRef.current.speaking) synthRef.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    utterance.pitch = 1.2;
    synthRef.current.speak(utterance);
  };

  const handleVoiceInput = () => {
    if (isListening) return;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Your browser doesn't support voice input.");

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

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
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText.trim();
    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setInputText("");
    setIsLoading(true);

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer YOUR_API_KEY",
          "Content-Type": "application/json",
          "HTTP-Referer": "https://localhost:3000",
          "X-Title": "Zaycommerce Chatbot"
        },
        body: JSON.stringify({
          "model": "deepseek/deepseek-r1-0528:free",
          "messages": [
            { "role": "user", "content": `${platformInfo}\nUser: ${userMessage}` }
          ]
        })
      });

      if (!res.ok) {
        throw new Error(`API responded with status ${res.status}`);
      }

      const data = await res.json();
      const fullResponse = data.choices[0].message.content;

      // Simulate word-by-word typing
      let display = "";
      const words = fullResponse.split(" ");
      for (let i = 0; i < words.length; i++) {
        await new Promise((r) => setTimeout(r, 20));
        display += words[i] + " ";
        setMessages((prev) => [
          ...newMessages,
          { role: "assistant", content: display.trim() }
        ]);
      }
      
      // Speak the full response
      speak(fullResponse);

    } catch (err) {
      const errorMessage = "👋 Hi there! I'm currently under development and learning new things. I'll be ready to assist you very soon. Thanks for understanding!";
      setMessages([
        ...newMessages,
        { role: "assistant", content: errorMessage }
      ]);
      speak(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-black to-gray-900 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
        style={{
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.7)'
        }}
      >
        {open ? (
          <FiX size={24} className="animate-pulse" />
        ) : (
          <div className="relative">
            <FiMessageSquare size={20} />
            <FiStar 
              size={12} 
              className="absolute -top-1 -right-1 text-yellow-300 animate-spin"
              style={{ animationDuration: '5s' }}
            />
          </div>
        )}
      </button>

      {/* Chat Window */}
      {open && (
        <div 
          className="fixed bottom-20 right-6 w-[360px] max-h-[500px] border shadow-2xl rounded-xl flex flex-col overflow-hidden z-50 backdrop-blur-sm"
          style={{
            background: `linear-gradient(145deg, #000000, #111111), url("${starPattern}")`,
            backgroundSize: 'cover, 150px 150px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Header with gradient */}
          <div className=" bg-gradient-to-r from-black to-gray-900 text-white px-4 py-3 font-bold flex items-center border-b border-gray-800 gap-1">
    
            
            Zay 
            <div className="ml-auto flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-2 h-2 rounded-full bg-white opacity-20 animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 text-sm no-scrollbar">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`px-4 py-3 rounded-2xl max-w-[85%] transition-all duration-300 ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-gray-800 to-black text-white self-end ml-auto rounded-br-none border border-gray-700"
                    : "bg-gradient-to-r from-gray-900 to-black text-gray-100 self-start mr-auto rounded-bl-none border border-gray-800"
                }`}
                style={{
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)'
                }}
              >
                <div className="markdown-container">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center px-4 py-2 bg-gray-900 rounded-full self-start w-max border border-gray-800">
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    ></div>
                  ))}
                </div>
                <span className="ml-2 text-xs text-gray-400">Thinking...</span>
              </div>
            )}
            <div ref={chatRef} />
          </div>

          {/* Input Area */}
          <form 
            onSubmit={handleSubmit} 
            className="flex gap-2 border-t border-gray-800 px-3 py-3"
          >
            <button
              type="button"
              onClick={handleVoiceInput}
              className={`text-xl p-2 rounded-full ${
                isListening 
                  ? "text-red-500 animate-pulse bg-red-500/10" 
                  : "text-gray-400 hover:text-white"
              }`}
              disabled={isLoading}
            >
              <FiMic />
            </button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about products, payments, or withdrawals..."
              className="flex-1 text-sm px-4 py-2 rounded-full bg-gray-900 text-white placeholder-gray-600 outline-none focus:ring-2 focus:ring-gray-700 border border-gray-800"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="bg-gradient-to-r from-gray-800 to-black hover:from-gray-900 hover:to-black text-white px-4 py-2 rounded-full text-sm font-medium disabled:opacity-50 transition-all border border-gray-800"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;