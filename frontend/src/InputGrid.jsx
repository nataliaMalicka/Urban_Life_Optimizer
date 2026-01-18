import "./InputGrid.css";
import { useState } from "react";

const inputConfig = [
  {
    id: "homeNeighbourhood",
    label: "Your neighbourhood",
    type: "text",
    placeholder: "Enter postal code",
  },
  {
    id: "workNeighbourhood",
    label: "Office neighbourhood",
    type: "text",
    placeholder: "Enter postal code",
  },
  {
    id: "daysOfWork",
    label: "Days per week in-person",
    type: "text",
    placeholder: "Enter a number",
  },
  {
    id: "hasCar",
    label: "Do you have a car?",
    type: "text",
    placeholder: "Enter yes or no",
  },
  {
    id: "monthlyIncome",
    label: "Monthly Income",
    type: "text",
    placeholder: "Enter monthly income",
  },
  {
    id: "commuteTime",
    label: "Commute time",
    type: "text",
    placeholder: "Enter commute time",
  },
  {
    id: "commuteTolerance",
    label: "Max commute time tolerance",
    type: "text",
    placeholder: "Enter commute time tolerance",
  },
  {
    id: "transitPreference",
    label: "Transit vs driving preference",
    type: "text",
    placeholder: "Enter preference",
  },
  {
    id: "workHours",
    label: "Work hours",
    type: "text",
    placeholder: "Enter your work hours",
  },
  {
    id: "livingSituation",
    label: "Current living situation",
    type: "text",
    placeholder: "Enter your living situation",
  },
  {
    id: "budgetComfort",
    label: "Budget comfort",
    type: "text",
    placeholder: "Enter your budget comfort",
  },
  {
    id: "roommatePreference",
    label: "Roommate Preference",
    type: "text",
    placeholder: "Enter your roommate preference",
  },
  {
    id: "extracurricular1",
    label: "Extracurricular 1",
    type: "text",
    placeholder: "Enter extracurricular 1",
  },
  {
    id: "extracurricular1Days",
    label: "Days per week",
    type: "text",
    placeholder: "Enter a number",
  },
  {
    id: "extracurricular2",
    label: "Extracurricular 2",
    type: "text",
    placeholder: "Enter extracurricular 2",
  },
  {
    id: "extracurricular2Days",
    label: "Days per week",
    type: "text",
    placeholder: "Enter a number",
  },
  {
    id: "extracurricular3",
    label: "Extracurricular 3",
    type: "text",
    placeholder: "Enter extracurricular 3",
  },
  {
    id: "extracurricular3Days",
    label: "Days per week",
    type: "text",
    placeholder: "Enter a number",
  },
];

function InputGrid() {
  const [formData, setFormData] = useState({});

  const handleChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  return (
    <div className="inputContainer">
      <div className="inputGrid">
        {inputConfig.map((field) => (
          <div key={field.id} className="inputGroup">
            <label className="inputLabel">{field.label}</label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              min={field.min}
              max={field.max}
              onChange={(e) => handleChange(field.id, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default InputGrid;
