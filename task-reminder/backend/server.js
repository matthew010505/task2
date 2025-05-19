

import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  "https://svnjphhvazxmmkhlomug.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2bmpwaGh2YXp4bW1raGxvbXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNzgxNTcsImV4cCI6MjA2Mjk1NDE1N30.UEM-yfuUY3IuM5VNAcUeezZnfyrolmxLrvx1sEaA_yc"
);


app.post('/register',async(req,res)=>{
  try{
      const {email,password } = req.body;
      

      const ifEmailExists=async(email)=>{
          const {data,error}=await supabase
          .from("users")
          .select("email")
          .eq("email",email);

          if(error) throw new Error(`error checking email: ${error.message}`);
          return data.length>0;
      }

      

      const emailExists = await ifEmailExists(email);

      if (emailExists) {
        console.log("email exists");
          return res.status(400).json({ message: "exist-email" });
      }

      
      const saveData = async () => {
          const { data, error } = await supabase
              .from("users")
              .insert({
                  
                  email,
                  password,
              })
              .select(); 

          if (error) throw new Error(`Error saving data: ${error.message}`);
          return data;
      };

      const insertedData = await saveData();
      res.status(200).json({ message: "User registered successfully", data: insertedData });

  }
  catch(e){
      console.error(`Error in /register endpoint: ${e.message}`);
      res.status(500).json({ message: "Internal server error" });
  }


})

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password);

    if (error) throw new Error(`Error during login: ${error.message}`);

    if (data.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user: data[0] });
  } catch (err) {
    console.error(`Error in /login endpoint: ${err.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.post("/addtask", async (req, res) => {
  try {
    const { task, reminder } = req.body;
    if (!task || !reminder) return res.status(400).json({ error: "Missing fields" });

    const { data, error } = await supabase
      .from("taskdb3")
      .insert([{ task, reminder }])
      .select();

    if (error) throw error;
    res.status(200).json({ message: "Task added", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("taskdb3")
      .select("*")
      .order("id", { ascending: false });

    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.delete("/deletetask/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("taskdb")
      .delete()
      .eq("id", id); 

    if (error) throw error;

    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});






app.listen(8000, () => {
  console.log("server is running on port 8000");
});


