import "./InputGrid.css";
import { useState, useEffect } from "react";

const inputConfig = [
  {
    id: "daysOfWork",
    label: "Days per week in-person",
    type: "select",
    options: ["1", "2", "3", "4", "5", "6", "7"],
    required: true,
  },
  {
    id: "workHours",
    label: "Daily work hours",
    type: "select",
    options: Array.from({ length: 20 }, (_, i) => i + 1),
    required: false,
  },
  {
    id: "hasDog",
    label: "Do you have a dog?",
    type: "select",
    options: ["Yes", "No"],
    required: false,
  },
  {
    id: "hasChildren",
    label: "Do you have any children?",
    type: "select",
    options: ["Yes", "No"],
    required: false,
  },
  {
    id: "roommatePreference",
    label: "Do you have a preference for roommates?",
    type: "select",
    options: ["Yes", "No"],
    required: false,
  }
];

function InputGrid({ setGridPage, formData, setFormData }) {
  const [response, setResponse] = useState("");

  const handleChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value, }));
  };
  
  return (
      <div className="inputContainer">
        <h5 className="inputSubTitle">Work & Lifestyle</h5>
        <div className="inputGrid">
          {inputConfig.map((field) => (
            <div key={field.id} className="inputGroup">
              <label className="inputLabel">
                {field.required && <span className="required">* </span>}
                {field.label}
              </label>

              {field.type === "select" ? (
                <select
                  className="inputStyle"
                  value={formData[field.id]}
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
                  className="inputStyle"
                  placeholder={field.placeholder}
                  value={formData[field.id]}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>

      <div className="actionContainer">
        <div className="buttonGroup" style={{ display: "flex", gap: "10px" }}>
          <button 
            className="back-btn" 
            onClick={() => setGridPage(1)}
          >
            Back
          </button>

          <button 
            className="next-btn" 
            onClick={() => setGridPage(3)} 
          >
            Next
          </button>
        </div>

        {response && (
          <div className="response fade-in">
            <h3>Recommendations:</h3>
            <p style={{ whiteSpace: "pre-wrap" }}>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default InputGrid;
