import dotenv from 'dotenv';
dotenv.config({ path: '../.env.local' });

import express from 'express';
import cors from 'cors';
import { askGemini } from './services/gemini.js';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname FIRST
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

const rentData = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data/postal_code_neighborhoods_complete.json'), 'utf-8')
);
const schoolsData = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data/schools.json'), 'utf-8')
);
const dogData = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data/dog-off-leash-parks.json'), 'utf-8')
);
const skyTrainData = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data/skytrain-stations.json'), 'utf-8')
);

console.log('Data loaded:', {
  rentData: rentData.length + ' entries',
  schoolsData: schoolsData.length + ' entries',
  dogData: dogData.length + ' entries',
  skyTrainData: skyTrainData.length + ' entries',
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Express Server!');
});

app.post('/save-data', (req, res) => {
  try {
    const data = req.body;
    const dirPath = path.join(__dirname, 'data', 'user');
    const filePath = path.join(dirPath, 'userData.json');

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
  console.log('=== /ask endpoint hit ===');

  try {
    const { prompt, context } = req.body;
    const userPostalCode = context.homeNeighbourhood?.toUpperCase();

    // Filter rent data to match user's postal code
    const filteredRentData = rentData.filter(r =>
        r.postal_code?.toUpperCase() === userPostalCode
    );

    // Filter skytrain stations by neighbourhood (if geo_local_area matches)
    const userNeighbourhood = filteredRentData[0]?.neighborhood;
    const filteredSkyTrainData = skyTrainData.filter(s =>
        s.geo_local_area === userNeighbourhood
    );

    const enrichedContext = {
      ...context,
      rentData: filteredRentData,
      skyTrainData: filteredSkyTrainData,
    };

    // Filter schools by neighbourhood
    if (parseInt(context.childrenNumber) > 0) {
      enrichedContext.schoolsData = schoolsData.filter(s =>
          s.geo_local_area === userNeighbourhood
      );
    }

    // Filter dog parks by neighbourhood
    if (context.hasDog?.toLowerCase() === 'yes') {
      enrichedContext.dogData = dogData.filter(d =>
          d.geo_local_area === userNeighbourhood
      );
    }

    console.log('Filtered data:', {
      rentData: enrichedContext.rentData?.length || 0,
      skyTrainData: enrichedContext.skyTrainData?.length || 0,
      schoolsData: enrichedContext.schoolsData?.length || 0,
      dogData: enrichedContext.dogData?.length || 0,
    });

    const response = await askGemini(prompt, enrichedContext);
    res.json({ response });
  } catch (error) {
    console.log('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});