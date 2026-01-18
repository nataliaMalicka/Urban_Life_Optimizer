import "./InputGrid.css";
import { useState, useEffect } from "react";

const inputConfig = [
	{
		id: "monthlyIncome",
		label: "Monthly income",
		type: "text",
		placeholder: "Enter a number",
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

function InputGrid3({ setGridPage, formData, setFormData }) {
	const [showErrors, setShowErrors] = useState(false);
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
		setFormData((prev) => ({ ...prev, [id]: value }));
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

	const handleSubmit = async () => {
		setLoading(true);
		setResponse("");
		try {
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
${formData.hasChildren?.toLowerCase() === 'yes' ? '- Schools: [List 2-3 specific schools from schoolsData with names and addresses]' : ''}
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
                <h5 className="inputSubTitle">Financials</h5>
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
                                <input
                                    className={`inputStyle ${isError ? "input-error" : ""}`}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    value={formData[field.id] || ""}
                                    onChange={(e) => handleChange(field.id, e.target.value)} 
                                />
                            </div>
                        );
                    })}
                </div>

                {loading && (
                    <div className="progressWrapper">
                        <div className="progressBarContainer">
                            <div className="progressBarFill" style={{ width: `${progress}%` }}></div>
                        </div>
                        <p className="loadingText">Analyzing your urban lifestyle...</p>
                    </div>
                )}

                {response && !loading && (
                    <div className="response fade-in">
                        <h3>Recommendations:</h3>
                        <p style={{ whiteSpace: "pre-wrap" }}>{response}</p>
                    </div>
                )}
            </div>

            <div className="actionContainer">
                <button
                    className="back-btn"
                    onClick={() => setGridPage(2)}
                    disabled={loading}
                >
                    Back
                </button>
                
                <button
                    className="submit-btn"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "Thinking..." : "Get Recommendations"}
                </button>
            </div>
        </div>
    );
}

export default InputGrid3;