import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Define your custom instruction (acts like system prompt)
const friendPrompt = `
You are a personal task assistant for the user. Your job is to provide detailed information about their tasks, including:
- Explanation of the task
- Priority level
- Deadlines
- Summaries (both English and Malayalam if available)
- Suggestions on how to complete it efficiently

Answer in a friendly, supportive tone. Use Hinglish occasionally. Be concise, clear, and informative but short in explaining. If the user asks about multiple tasks, respond one by one. Do not sound robotic.
`;


// ✅ Helper function to safely call Gemini with retry
async function safeSendMessage(chat, message, retries = 3, delay = 3000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await chat.sendMessage(message);
      return result.response.text();
    } catch (err) {
      if (err.status === 503 && attempt < retries) {
        console.warn(`⚠️ Gemini overloaded. Retrying in ${delay / 1000}s... (Attempt ${attempt})`);
        await new Promise((res) => setTimeout(res, delay));
      } else {
        throw err;
      }
    }
  }
}

app.post("/chat", async (req, res) => {
  try {
    const { message, tasks } = req.body;

    // Convert tasks to a readable string (English only)
    let taskText = "";
    if (tasks && tasks.length > 0) {
      taskText = tasks
        .map(
          (t, idx) =>
            `Task ${idx + 1}: ${t.title}\nDescription: ${t.description}\nSummary: ${t.summary}\nStatus: ${t.status}`
        )
        .join("\n\n");
    }

    // Combine user message + task info
    const fullMessage = `${message}\n\nHere are the tasks you should consider:\n${taskText}`;

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: friendPrompt }],
        },
      ],
    });

    // Send combined message
    const result = await chat.sendMessage(fullMessage);
    const botReply = await safeSendMessage(chat, fullMessage);

    res.json({ reply: botReply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});


app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
