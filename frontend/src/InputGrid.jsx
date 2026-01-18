import "./InputGrid.css";
import { useState, useEffect } from "react";

const inputConfig = [
  {
    id: "homeNeighbourhood",
    label: "Home postal code",
    type: "text",
    placeholder: "Enter a text",
  },
  {
    id: "officeNeighbourhood",
    label: "Office postal code",
    type: "text",
    placeholder: "Enter a text",
  },
  {
    id: "daysOfWork",
    label: "Days per week in-person",
    type: "select",
    options: ["1", "2", "3", "4", "5", "6", "7"],
  },
  {
    id: "transportationMethod",
    label: "Transportation method",
    type: "select",
    options: ["Transit", "Car", "Bike", "Walk"],
  },
  {
    id: "monthlyIncome",
    label: "Monthly income",
    type: "text",
    placeholder: "Enter a number",
  },
  {
    id: "commuteTime",
    label: "Commute time",
    type: "text",
    placeholder: "Enter a number",
  },
  {
    id: "commuteTolerance",
    label: "Max commute time tolerance",
    type: "text",
    placeholder: "Enter a number",
  },
  {
    id: "workHours",
    label: "Daily work hours",
    type: "select",
    options: Array.from({ length: 20 }, (_, i) => i + 1),
  },
  {
    id: "hasDog",
    label: "Do you have a dog?",
    type: "select",
    options: ["Yes", "No"],
  },
  {
    id: "hasChildren",
    label: "Do you have any children?",
    type: "select",
    options: ["Yes", "No"],
  },
  {
    id: "roommatePreference",
    label: "Do you have a preference for roommates?",
    type: "select",
    options: ["Yes", "No"],
  },
  {
    id: "monthlyBudget",
    label: "Monthly budget",
    type: "text",
    placeholder: "Enter a number",
  },
  {
    id: "rentExpense",
    label: "Ideal monthly expense on rent",
    type: "text",
    placeholder: "Enter a number",
  },
];

function InputGrid() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [response, setResponse] = useState("");

  useEffect(() => {
    let interval;
    if (loading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + 5;
        });
      }, 200);
    } else {
      setProgress(0);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value, }));
  };

  const handleSubmit = async () => {
  setLoading(true);
  setResponse("");
  try {
    // Save data to JSON file
    await fetch('http://localhost:3000/save-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    // Ask Gemini via backend
    const res = await fetch('http://localhost:3000/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: `You are an urban life optimizer for Vancouver, BC. Analyze this user's situation using the provided data and return a recommended lifestyle plan.

USE THE PROVIDED DATA:
- rentData: Match postal codes to find neighborhoods, average/median rent, vacancy rates
- skyTrainData: Find nearest stations to home and work postal codes
- schoolsData (if provided): Find schools near home postal code
- dogData (if provided): Find off-leash dog parks near home postal code (use geo_local_area if park_name is null)

RESPOND IN THIS EXACT FORMAT:

**Recommended Lifestyle Plan**

- Living: [Recommended neighborhood and why, based on rentData prices vs their budget]
- Commute: [Transit X days/week, drive X days/week - based on their daysOfWork and transportationMethod]
- Commute time: [Estimated average based on skyTrainData proximity] (within/exceeds tolerance)
- Car: [Keep car / sell car / reduce usage - based on their situation]
- Financial impact: [High/Moderate/Low savings potential based on rent vs budget]
- Burnout risk: [Low/Moderate/High based on commute time vs tolerance and work hours]

**Why this works for you:**
[2-3 sentences explaining the recommendation using specific data points - actual rent prices, station names, distances]

**Nearby Amenities:**
${formData.hasDog?.toLowerCase() === 'yes' ? '- Dog parks: [List 2-3 specific parks/areas from dogData with neighborhoods]' : ''}
${parseInt(formData.childrenNumber) > 0 ? '- Schools: [List 2-3 specific schools from schoolsData with names and addresses]' : ''}
- Transit: [List 2-3 nearest SkyTrain stations from skyTrainData]

**Top 3 Action Items:**
1. [Specific actionable step]
2. [Specific actionable step]
3. [Specific actionable step]

Be concise and specific. Use actual names, numbers, and addresses from the data.`,
        context: formData,
      }),
    });
    
    const data = await res.json();
    setProgress(100);
    setResponse(data.response);
  } catch (error) {
    console.error(error);
    setResponse("An error occurred. Please try again.");
  } finally {
    setTimeout(() => setLoading(false), 500);
  }
};
  
  return (
    <div>
      <div className="inputContainer">
        <div className="inputGrid">
          {inputConfig.map((field) => (
            <div key={field.id} className="inputGroup">
              <label className="inputLabel">{field.label}</label>

              {field.type === "select" ? (
                <select
                  className="inputSelect"
                  defaultValue=""
                  onChange={(e) => handleChange(field.id, e.target.value)}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="actionContainer">
        <button 
          className="submit-btn" 
          onClick={handleSubmit} 
          disabled={loading}
        >
          {loading ? "Thinking..." : "Get Recommendations"}
        </button>

        {loading && (
          <div className="progressWrapper">
            <div className="progressBarContainer">
              <div 
                className="progressBarFill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="loadingText">Analyzing your urban lifestyle...</p>
          </div>
        )}

        {response && !loading && (
          <div className="response fade-in">
            <h3>Recommendations:</h3>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default InputGrid;
