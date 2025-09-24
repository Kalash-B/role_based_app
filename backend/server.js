import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// In-memory storage for users (in production, use a database)
let users = [
  {
    id: "1",
    username: "Engineer",
    email: "engineer@metro.com",
    name: "Yash Jain",
    role: "user",
    password: "$2a$10$FZ2Jbi7ZZskYTZRr5HbZ9OwklAMdX8dTih/eVGe4Q.pP/zfe4L67e", // password1
    createdAt: new Date().toISOString(),
    isActive: true
  },
  {
    id: "2",
    username: "Manager",
    email: "manager@metro.com",
    name: "Anjali Menon",
    role: "user",
    password: "$2a$10$PfWqfmNY0sfLvNp6Y2qMlOx.V3gDos2qcoMpQgNKhz6Hz7dhiDboe", // password2
    createdAt: new Date().toISOString(),
    isActive: true
  },
  {
    id: "3",
    username: "Depot_Manager",
    email: "depot@metro.com",
    name: "Vardhan Shah",
    role: "user",
    password: "$2a$10$cg7PbduO7SdKKy7KE00uVuDrP7zxhqFVyT9WJkwSKuA4.ZYTNxDzW", // password3
    createdAt: new Date().toISOString(),
    isActive: true
  },
  {
    id: "admin1",
    username: "admin",
    email: "admin@metro.com",
    name: "Kaushal Baldota",
    role: "admin",
    password: "$2a$10$FJNS7dKmnxe1iDSQkeRNhue9j/wtaMlcrbNBY8j8NCAUIA7Kvcd2G", // admin123
    createdAt: new Date().toISOString(),
    isActive: true
  },
  {
    id: "admin2",
    username: "superadmin",
    email: "superadmin@metro.com",
    name: "Navya Nair",
    role: "admin",
    password: "$2a$10$ZGzvFAIcmRe9BxyINa0ihO3ucGVnJlEgUYkVdYG2Hglw4fFdQ.iEy", // super123
    createdAt: new Date().toISOString(),
    isActive: true
  }
];

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Admin middleware
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

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

// ==================== AUTHENTICATION ROUTES ====================

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    console.log('Login attempt:', req.body);
    const { username, password, isAdmin } = req.body;

    if (!username || !password) {
      console.log('Missing username or password');
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = users.find(u => u.username === username && u.isActive);
    console.log('Found user:', user ? user.username : 'Not found');
    
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if user role matches the login type
    if ((isAdmin && user.role !== 'admin') || (!isAdmin && user.role !== 'user')) {
      console.log('Role mismatch:', { isAdmin, userRole: user.role });
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    console.log('Password valid:', validPassword);
    
    if (!validPassword) {
      console.log('Invalid password');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('Login successful for:', username);
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ==================== USER MANAGEMENT ROUTES ====================

// Get all users (Admin only)
app.get('/api/users', authenticateToken, requireAdmin, (req, res) => {
  try {
    const userList = users
      .filter(user => user.isActive)
      .map(user => ({
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }));
    
    res.json(userList);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new user (Admin only)
app.post('/api/users', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { username, email, name, password, role } = req.body;

    // Validation
    if (!username || !email || !name || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Role must be either "user" or "admin"' });
    }

    // Check if username or email already exists (only active users)
    const existingUser = users.find(u => (u.username === username || u.email === email) && (u.isActive !== false));
    console.log('Checking for duplicates:', { username, email, existingUser: existingUser ? existingUser.username : 'none' });
    if (existingUser) {
      console.log('Duplicate found:', existingUser);
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = {
      id: uuidv4(),
      username,
      email,
      name,
      role,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      isActive: true
    };

    users.push(newUser);

    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user (Admin only)
app.put('/api/users/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, name, role, password } = req.body;

    const userIndex = users.findIndex(u => u.id === id && u.isActive);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if username or email already exists (excluding current user, only active users)
    const existingUser = users.find(u => 
      (u.username === username || u.email === email) && u.id !== id && (u.isActive !== false)
    );
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Update user
    const updatedUser = { ...users[userIndex] };
    
    if (username) updatedUser.username = username;
    if (email) updatedUser.email = email;
    if (name) updatedUser.name = name;
    if (role) updatedUser.role = role;
    if (password) {
      const saltRounds = 10;
      updatedUser.password = await bcrypt.hash(password, saltRounds);
    }

    users[userIndex] = updatedUser;

    res.json({
      id: updatedUser.id,
      username: updatedUser.username,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      createdAt: updatedUser.createdAt
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete user (Admin only)
app.delete('/api/users/:id', authenticateToken, requireAdmin, (req, res) => {
  try {
    const { id } = req.params;

    const userIndex = users.findIndex(u => u.id === id && u.isActive);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Soft delete
    users[userIndex].isActive = false;

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user profile
app.get('/api/profile', authenticateToken, (req, res) => {
  try {
    const user = users.find(u => u.id === req.user.id && u.isActive);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


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
            `Task ${idx + 1}: ${t.title}\nSummary: ${t.summary}\nDescription: ${t.description}\nStatus: ${t.status}`
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


app.listen(3001, () => console.log("✅ Server running on http://localhost:3001"));
