import { useNavigate } from "react-router-dom";
import "./InputGrid.css";
import { useState, useEffect } from "react";

const inputConfig = [
  {
    id: "monthlyIncome",
    label: "Monthly income",
    type: "text",
    placeholder: "Enter a number (dollars)",
  },
  {
    id: "monthlyBudget",
    label: "Monthly budget",
    type: "text",
    placeholder: "Enter a number (dollars)",
  },
  {
    id: "rentExpense",
    label: "Ideal monthly expense on rent",
    type: "text",
    placeholder: "Enter a number (dollars)",
  },
];

function InputGrid3({ setGridPage, formData, setFormData }) {
	const [loading, setLoading] = useState(false);
	const [progress, setProgress] = useState(0);
	const navigate = useNavigate();

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
    const numericValue = value.replace(/\D/g, "");
    const finalValue = numericValue.replace(/^0+/, "") || (numericValue === "0" ? "0" : "");

    setFormData((prev) => ({ ...prev, [id]: finalValue }));
};

	const handleNext = () => {
		const requiredFields = inputConfig.filter(field => field.required);
		const missingFields = requiredFields.filter(field => !formData[field.id]);

		if (missingFields.length > 0) {
			alert("Please fill in all required fields before continuing.");
			return;
		}

		setGridPage(current => current + 1);
	};

	const handleSubmit = async () => {
		setLoading(true);
		try {
			await fetch('http://localhost:3000/save-data', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});

			const res = await fetch('http://localhost:3000/ask', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					prompt: `You are a professional Vancouver Urban Consultant. 
Analyze this data: ${JSON.stringify(formData)}

STRICT RULES:
1. TOP OVERVIEW: The fields 'living_short', 'commute_short', 'time_short', and 'car_short' must be 1 sentence only.
2. DETAILED ANALYSIS: Move all long explanations, neighborhood names, and route details to the 'living_detail' and 'commute_detail' sections.
3. NO DATA REPEATING: Don't tell them what they told you. Provide new advice.
4. ACTION ITEMS: Exactly 3.
5. REALITY CHECK: Use accurate distances between locations and how long it would take to commute there by car, bus, bike, or walking based on the user's input.
6. BE DECISIVE: Provide clear recommendations, not options. Do not tell the user to 'assess' anything... that's your job.
7. BLANK FIELDS: If any fields are blank or missing, do not address them.

STRICT LANGUAGE RULES:
1. NEVER use technical variable names or JSON keys (e.g., do NOT say 'hasDog', 'roommatePreference', 'daysOfWork', or 'transportationMethod').
2. Speak in a warm, natural human voice addressing the user ('You').
3. NO markdown backticks. Return raw JSON only.

JSON Structure:
{
  "living_short": "Brief neighborhood name & cost benefit.",
  "commute_short": "Brief primary mode & route name.",
  "time_short": "Estimated mins (e.g. 25-30 mins).",
  "car_short": "Brief Keep/Sell/Reduce advice.",
  "living_detail": "Detailed breakdown of 2-3 specific neighborhoods (e.g., Marpole, Sunset) and why they fit roommates/dogs.",
  "commute_detail": "Specific street-by-street or transit line directions (e.g., Canada Line to City Centre).",
  "financialImpact": "Detailed savings projection.",
  "burnoutRisk": "Detailed lifestyle sustainability analysis.",
  "whyItWorks": "Final summary sentence.",
  "actionItems": ["Step 1", "Step 2", "Step 3"]
}`,
// 					prompt: `You are a professional urban lifestyle optimizer for Vancouver, BC. Analyze this user's situation using the provided data and return a provide a friendly, clear, and actionable plan for the user.

// STRICT GUIDELINES:
// - Never mention "JSON," "data files," or "provided data."
// - Speak directly to the user (use "You" instead of "The user").
// - Act as if you naturally know the current rent prices, transit routes, and park locations in Vancouver.

// USE THE PROVIDED DATA:
// - rentData: Match postal codes to find neighborhoods, average/median rent, vacancy rates
// - skyTrainData: Find nearest stations to home and work postal codes
// - schoolsData (if provided): Find schools near home postal code
// - dogData (if provided): Find off-leash dog parks near home postal code (use geo_local_area if park_name is null)

// RESPOND IN THIS EXACT FORMAT:

// **Recommended Lifestyle Plan**

// - Living: [Recommended neighborhood and why, based on rentData prices vs their budget]
// - Commute: [Transit X days/week, drive X days/week - based on their daysOfWork and transportationMethod]
// - Commute time: [Estimated average based on skyTrainData proximity] (within/exceeds tolerance)
// - Car: [Keep car / sell car / reduce usage - based on their situation]
// - Financial impact: [High/Moderate/Low savings potential based on rent vs budget]
// - Burnout risk: [Low/Moderate/High based on commute time vs tolerance and work hours]

// **Why this works for you:**
// [2-3 sentences explaining the recommendation using specific data points - actual rent prices, station names, distances. Use line breaks to split each point into its own paragraph.]

// **Nearby Amenities:**
// ${formData.hasDog?.toLowerCase() === 'yes' ? '- Dog parks: [List 2-3 specific parks/areas from dogData with neighborhoods]' : ''}
// ${formData.hasChildren?.toLowerCase() === 'yes' ? '- Schools: [List 2-3 specific schools from schoolsData with names and addresses]' : ''}
// - Transit: [List 2-3 nearest SkyTrain stations from skyTrainData]

// **Top 3 Action Items:**
// 1. [Specific actionable step]
// 2. [Specific actionable step]
// 3. [Specific actionable step]

// Be concise and specific. Use actual names, numbers, and addresses from the data.`,
					context: formData,
				}),
			});

			const data = await res.json();
			setProgress(100);
			navigate('/OutputPage', { state: data.response });
		} catch (error) {
			console.error(error);
		} finally {
			setTimeout(() => setLoading(false), 500);
		}
	};

	return (
		<div>
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
									className="inputStyle"
									type={field.type}
									placeholder={field.placeholder}
									value={formData[field.id]}
									onChange={(e) => handleChange(field.id, e.target.value)} />
							)}
						</div>
					))}
				</div>

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
