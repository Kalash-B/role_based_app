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

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        // Filter tasks for this user
        const userTasks = parsedTasks.filter((task) => task.assignedTo === userId);
        setTasks(userTasks);
      } catch (err) {
        console.error("Error parsing tasks from localStorage:", err);
      }
    }
  }, [userId]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 1️⃣ Get the logged-in user
    const user = JSON.parse(localStorage.getItem("user"));

    // 2️⃣ Get all tasks
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // 3️⃣ Filter tasks for the logged-in user
    const userTasks = tasks.filter(task => task.assignedTo === user.id);

    // 4️⃣ Map only the summary
    const userSummaries = userTasks.map(task => task.summary);

    console.log(userSummaries);


    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setLoading(true);

    try {
      // Prepare tasks in English to send to AI
      const tasksForAI = tasks.map((task) => ({
        title: task.title,
        description: task.description,
        summary: userSummaries,
        status: task.status,
        deadline: task.deadline || "Not set",
      }));

      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          tasks: tasksForAI  // sending tasks along with user message
        }),
      });

      const data = await response.json();

      // Add AI reply
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [
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
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-xl shadow-lg border border-[#A4CCD9] flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-2 bg-[#C4E1E6] rounded-t-xl">
            <h3 className="font-semibold text-black">Chat Bot</h3>
            <button onClick={toggleChat} className="hover:text-red-700">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 space-y-2 overflow-y-auto max-h-64">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                <span
                  className={`px-3 py-2 rounded-lg text-sm ${msg.sender === "user"
                    ? "bg-[#48B3AF] text-white"
                    : "bg-gray-200 text-gray-800"
                    }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}

            {/* Show tasks as separate messages */}
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

          {/* Input */}
          <form onSubmit={handleSend} className="p-2 border-t border-gray-200 flex">
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
