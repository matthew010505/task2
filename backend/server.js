import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

const supabase = createClient(
  "https://svnjphhvazxmmkhlomug.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2bmpwaGh2YXp4bW1raGxvbXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNzgxNTcsImV4cCI6MjA2Mjk1NDE1N30.UEM-yfuUY3IuM5VNAcUeezZnfyrolmxLrvx1sEaA_yc"
);

app.get("/ping", (_req, res) => res.send("pong"));

app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data: existing, error: e1 } = await supabase
      .from("users2")
      .select("id")
      .eq("email", email);
    if (e1) throw e1;
    if (existing.length) {
      return res.status(400).json({ message: "exist-email" });
    }

    const { data, error: e2 } = await supabase
      .from("users2")
      .insert({ email, password })
      .select();
    if (e2) throw e2;
    res.json({ message: "User registered successfully", user: data[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});




app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await supabase
      .from("users2")
      .select("*")
      .eq("email", email)
      .eq("password", password);
    if (error) throw error;
    if (!data.length) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({ message: "Login successful", user: data[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});



app.post("/addtask", async (req, res) => {
  const { task, reminder, userId } = req.body;
  if (!task || !reminder || !userId) {
    return res.status(400).json({ message: "Missing fields" });
  }
  try {
    const { data, error } = await supabase
      .from("taskdb4")
      .insert([{ task, reminder, user_id: userId }])
      .select();
    if (error) throw error;
    res.json({ message: "Task added", data: data[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.get("/tasks", async (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).json({ message: "Missing userId" });
  }
  try {
    const { data, error } = await supabase
      .from("taskdb4")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.delete("/deletetask/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { error } = await supabase
      .from("taskdb4")
      .delete()
      .eq("id", id);
    if (error) throw error;
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
