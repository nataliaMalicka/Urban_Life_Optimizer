import "./InputGrid.css";
import { useState } from "react";

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
    label: "Are you okay with having roommates?",
    type: "select",
    options: ["Yes", "No"],
    required: false,
  }
];

function InputGrid({ setGridPage, formData, setFormData }) {
  const [showErrors, setShowErrors] = useState(false);

  const handleChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value, }));
  };

  const handleNext = () => {
    const requiredFields = inputConfig.filter(field => field.required);
    const missingFields = requiredFields.filter(field => !formData[field.id]);

    if (missingFields.length > 0) {
      alert("Please fill in all required fields before continuing.");
      return;
  }

    setShowErrors(false);
    setGridPage(current => current + 1); 
  };
  
  return (
    <div>
      <div className="inputContainer">
        <h5 className="inputSubTitle">Work & Lifestyle</h5>
        <div className="inputGrid">
          {inputConfig.map((field) => {
            const fieldValue = formData[field.id] ? formData[field.id].toString().trim() : "";
            const isError = field.required && showErrors && fieldValue === "";

            return (
              <div key={field.id} className="inputGroup">
                <label className="inputLabel">
                  {field.required && <span className="required">* </span>}
                  {field.label}
                </label>

                {field.type === "select" ? (
                  <select
                    className={`inputStyle ${isError ? "input-error" : ""}`}
                    value={formData[field.id] || ""}
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
                    className={`inputStyle ${isError ? "input-error" : ""}`}
                    placeholder={field.placeholder}
                    value={formData[field.id] || ""}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="actionContainer">
        <button className="back-btn" onClick={() => setGridPage(1)}>
          Back
        </button>

        <button className="next-btn" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default InputGrid;
