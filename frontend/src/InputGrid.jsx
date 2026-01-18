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
    id: "childrenNumber",
    label: "How many children do you have?",
    type: "select",
    options: ["0", "1", "2", "3", "4", "5"],
  },
  {
    id: "roommatePreference",
    label: "Preference for the number of roommates",
    type: "select",
    options: ["0", "1", "2", "3", "4", "5", "6", "7"],
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
      const result = await askGemini("Analyze this user's urban life situation and give recommendations", formData);
      setProgress(100);
      setResponse(result);
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
