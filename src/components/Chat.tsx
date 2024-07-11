import React, { useEffect, useMemo, useRef, useState } from "react";
import chatLogo from "../assets/chat.jpg";

const Chat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<
    { text: string; type: "sent" | "received" }[]
  >([]);
  const [input, setInput] = useState<string>("");
  const ws = useRef<WebSocket>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  useEffect(() => {
    ws.current = new WebSocket("https://chatbot-dczq.onrender.com/");

    ws.current.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.current.onmessage = (event) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: event.data, type: "received" },
      ]);
      // console.log("response msg",message)
      // console.log(event.data)
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const messageHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ws.current && input.trim() !== "") {
      ws.current.send(input);
      setMessages((prev) => [...prev, { text: input, type: "sent" }]);
      setInput("");
    }

    console.log(messages);
  };

  return (
    <div className="fixed bottom-36 right-10 ">
      <button
        onClick={toggleChat}
        className="bg-blue-500 rounded-full p-3 shadow-lg focus:outline-none"
      >
        <img src={chatLogo} alt="Chat Logo" className="w-8 h-8 rounded-full" />
      </button>

      {isChatOpen && (
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg w-[400px] h-[500px] mt-4 p-4 flex flex-col">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Chat Support
            </h2>
            <button
              onClick={toggleChat}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              &#x2715;
            </button>
          </div>
          <div className="flex-1 overflow-y-auto mb-4">
            {/* Chat messages would go here */}
            {/* <p className="text-gray-600">Hello! How can we help you?</p> */}

            <div className="flex-1 overflow-y-auto mb-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.type === "sent" ? "justify-end" : "justify-start"
                  } mb-2`}
                >
                  <div
                    className={`p-3 rounded-lg ${
                      message.type === "sent"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <form action="" onSubmit={messageHandler}>
            <div className="border-t pt-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white mt-2 py-2 rounded-lg"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
