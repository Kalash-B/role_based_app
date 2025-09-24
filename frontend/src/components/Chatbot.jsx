import React, { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

const ChatBot = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const user = JSON.parse(localStorage.getItem("user"));
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const userTasks = allTasks.filter(task => task.assignedTo === user.id);
    console.log("User Tasks:", userTasks);

    // Add user message
    setMessages(prev => [...prev, { sender: "user", text: input }]);
    setLoading(true);

    // Format function
    const formatResponse = (text) => {
      if (!text) return "";
      let formatted = text;
      formatted = formatted.replace(/\*/g, "");      // remove asterisks
      formatted = formatted.replace(/- /g, "\n• ");  // bullet points
      formatted = formatted.replace(/\d+\./g, "\n$&"); // numbered lists
      formatted = formatted.replace(/\n{2,}/g, "\n\n");  // collapse multiple line breaks
      return formatted.trim();
    };

    try {
      // Send only the logged-in user's tasks
      const tasksForAI = userTasks.map(task => ({
        title: task.title,
        description: task.description,
        summary: task.summary,
        status: task.status,
        deadline: task.deadline || "Not set",
      }));

      const response = await fetch("http://localhost:3001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, tasks: tasksForAI }),
      });

      const data = await response.json();

      // Add AI reply
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: formatResponse(data.reply) },
      ]);

      // Optional: Update local tasks for displaying in chat
      setTasks(userTasks);

    } catch (error) {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "⚠️ Server error. Please try again later." },
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <div>
      {/* Floating Button */}
      <button
        aria-label="Chat bot"
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-[#48B3AF] hover:bg-[#3a8c87] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-[#8DBCC7] focus:ring-offset-2"
      >
        <MessageCircle size={28} />
      </button>

      {/* Popup Chat Box */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-3xl h-1/2 bg-white rounded-xl shadow-lg border border-[#A4CCD9] flex flex-col">

          {/* Header */}
          <div className="flex justify-between items-center px-4 py-2 bg-[#C4E1E6] rounded-t-xl">
            <h3 className="font-semibold text-black">Chat Bot</h3>
            <button onClick={toggleChat} className="hover:text-red-700">
              <X size={20} />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-3 overflow-y-auto flex flex-col space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <span
                  className={`px-3 py-2 rounded-lg text-sm ${msg.sender === "user"
                      ? "bg-[#48B3AF] text-white"
                      : "bg-gray-200 text-gray-800 whitespace-pre-wrap"
                    }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}

            {tasks.map((task) => (
              <div key={task.id} className="flex justify-start">
                <span className="px-3 py-2 rounded-lg text-sm bg-yellow-100 text-yellow-800">
                  Task: {task.title} | Status: {task.status}
                </span>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <span className="px-3 py-2 rounded-lg text-sm bg-gray-200 text-gray-800 animate-pulse">
                  Typing...
                </span>
              </div>
            )}
          </div>

          {/* Input Form - fixed at bottom */}
          <form
            onSubmit={handleSend}
            className="px-3 py-2 border-t border-gray-200 flex flex-none"
          >
            <input
              type="text"
              className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8DBCC7]"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="ml-2 px-3 py-2 bg-[#48B3AF] hover:bg-[#3a8c87] text-white rounded-lg"
            >
              Send
            </button>
          </form>
        </div>
      )}

    </div>

  );
};

export default ChatBot;
