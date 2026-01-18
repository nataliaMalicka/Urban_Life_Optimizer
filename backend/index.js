import dotenv from 'dotenv';
dotenv.config({ path: '../.env.local' });

import express from 'express';
import cors from 'cors';
import { askGemini } from './services/gemini.js';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

function getMatchingAreas(cmhcNeighbourhood) {
  const key = cmhcNeighbourhood?.toLowerCase();
  return neighbourhoodMapping[key] || [];
}

const neighbourhoodMapping = {
  "west end/stanley park": ["west end", "downtown"],
  "downtown": ["downtown"],
  "mount pleasant/renfrew heights": ["mount pleasant", "renfrew-collingwood", "kensington-cedar cottage"],
  "east hastings": ["hastings-sunrise", "grandview-woodland", "strathcona"],
  "southeast vancouver": ["victoria-fraserview", "killarney", "renfrew-collingwood"],
  "marpole": ["marpole"],
  "south granville/oak": ["fairview", "south cambie", "oakridge", "shaughnessy", "riley park"],
  "kitsilano/point grey": ["kitsilano", "west point grey", "fairview"],
  "westside/kerrisdale": ["kerrisdale", "arbutus ridge", "dunbar-southlands", "oakridge"],
  "university endowment lands": ["west point grey"],
  "english bay": ["west end", "downtown"]
};

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
    const userPostalCode = context.homePostalCode?.toUpperCase();

    // Filter rent data to match user's postal code
    const filteredRentData = rentData.filter(r =>
        r.postal_code?.toUpperCase().startsWith(userPostalCode)
    );

    // Get matching geo_local_areas from the CMHC neighbourhood
    const cmhcNeighbourhood = filteredRentData[0]?.neighborhood;
    const matchingAreas = getMatchingAreas(cmhcNeighbourhood);

    // Filter skytrain stations by matching areas
    const filteredSkyTrainData = skyTrainData.filter(s =>
        matchingAreas.includes(s.geo_local_area?.toLowerCase())
    );

    const enrichedContext = {
      ...context,
      rentData: filteredRentData,
      skyTrainData: filteredSkyTrainData,
    };

    // Filter schools by matching areas
    if (context.hasChildren?.toLowerCase() === 'yes') {
      enrichedContext.schoolsData = schoolsData.filter(s =>
          matchingAreas.includes(s.geo_local_area?.toLowerCase())
      );
    }

    // Filter dog parks by matching areas
    if (context.hasDog?.toLowerCase() === 'yes') {
      enrichedContext.dogData = dogData.filter(d =>
          matchingAreas.includes(d.geo_local_area?.toLowerCase())
      );
    }

    console.log('CMHC neighbourhood:', cmhcNeighbourhood);
    console.log('Matching areas:', matchingAreas);
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