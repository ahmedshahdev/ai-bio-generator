// server.js
const express = require("express");
const { OpenAI } = require("openai");
const cors = require("cors");
const app = express();
const port = 5000;

require("dotenv").config();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey:
    ""
});

app.post("/generate-bio", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo",
      prompt: "write me python hello world",
      max_tokens: 100,
      temperature: 0.7,
    });

    res.json({ bio: response.data.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.end("hello server");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
