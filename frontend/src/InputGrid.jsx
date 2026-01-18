import "./InputGrid.css";

const inputConfig = [
  {
    id: "homePostalCode",
    label: "Home postal code",
    type: "text",
    placeholder: "Enter a text",
    required: true,
  },
  {
    id: "officePostalCode",
    label: "Office postal code",
    type: "text",
    placeholder: "Enter a text",
    required: true,
  },
  {
    id: "transportationMethod",
    label: "Transportation method",
    type: "select",
    options: ["Transit", "Car", "Bike", "Walk"],
    required: true,
  },
  {
    id: "commuteTime",
    label: "Commute time",
    type: "text",
    placeholder: "Enter a number",
    required: true,
  },
  {
    id: "maxCommuteTimeTolerance",
    label: "Max commute time tolerance",
    type: "text",
    placeholder: "Enter a number",
  },
];

function InputGrid({ setGridPage, formData, setFormData }) {
  const handleChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div>
      <div className="inputContainer">
        <h5 className="inputSubTitle">Location & Commute</h5>
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
                  className="inputStyle"
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.id]}
                  onChange={(e) => handleChange(field.id, e.target.value)} />
              )}
            </div>
          ))}
        </div>
        <button className="next-btn" onClick={() => setGridPage(2)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default InputGrid;
