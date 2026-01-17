import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Nat test - run test api request
import { askGemini } from './services/gemini';

// Kitsilano neighbourhood data
const kitsilanoData = {
    neighbourhood: "Kitsilano",
    city: "Vancouver",
    postalCode: "V6K",
    rentAverage: {
        studio: 1800,
        oneBedroom: 2400,
        twoBedroom: 3200,
        currency: "CAD"
    },
    demographics: {
        population: 40000,
        medianAge: 35,
        vibe: "Young professionals, families, beach lifestyle"
    },
    amenities: {
        beaches: ["Kitsilano Beach", "Jericho Beach"],
        parks: ["Kitsilano Beach Park", "Vanier Park"],
        shopping: ["West 4th Avenue", "Broadway"]
    }
};

askGemini(
    "Tell me about moving to this neighbourhood. What are the best restaurants, cafes, and things to do? Is it good for young professionals?",
    kitsilanoData
);