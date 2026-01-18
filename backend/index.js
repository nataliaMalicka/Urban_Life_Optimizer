import dotenv from 'dotenv';
dotenv.config({ path: '../.env.local' });

import express from 'express';
import cors from 'cors';
import { askGemini } from './services/gemini.js';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;
const filePath = path.join(__dirname, 'data', 'user', 'userData.json');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Express Server!');
});

// Save form data to JSON file
app.post('/save-data', (req, res) => {
  try {
    const data = req.body;
    const dirPath = path.join(__dirname, 'data', 'user');
    const filePath = path.join(dirPath, 'userData.json');

    // Create folder if it doesn't exist
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log('Saved to:', filePath);

    res.json({ success: true, path: filePath });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.post('/ask', async (req, res) => {
  try {
    const { prompt, context } = req.body;
    const response = await askGemini(prompt, context);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

