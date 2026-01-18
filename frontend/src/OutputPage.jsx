import { useEffect, useState } from 'react'
import Background from './assets/background.png'
import HeaderComponent from './HeaderComponent'
import './OutputPage.css'
import { useLocation, useNavigate } from 'react-router-dom'

export default function OutputPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (location.state) {
      try {
        let rawData = location.state;

        if (typeof rawData === 'string') {
          rawData = rawData.replace(/```json|```/gi, '').trim();
        }

        const aiData = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
        setResult(aiData);

      } catch (e) {
        console.error("Parsing error:", e);
        setResult({
          living: "Error parsing data",
          commute: "Please try again",
          whyItWorks: location.state,
          actionItems: []
        });
      }
    }
  }, [location.state]);

  if (!result) return <div className="loading">Processing plan...</div>;

  const handleStartOver = () => {
    navigate('/InputPage');
  };

  return (
    <div id='output-page-outer-container'>
      <img src={Background} className='background-image' />
      <HeaderComponent />
      <div id='output-page-container'>
        <h2 id='output-page-recommended-title' className='output-page-header-text'>
          Recommended Lifestyle Plan
        </h2>

        <div className="summary-section">
          <p className='output-page-plain-text'><strong>📍 Living:</strong> {result.living_short}</p>
          <p className='output-page-plain-text'><strong>🚗 Commute:</strong> {result.commute_short}</p>
          <p className='output-page-plain-text'><strong>⏱️ Commute Time:</strong> {result.time_short}</p>
          <p className='output-page-plain-text'><strong>🔑 Car:</strong> {result.car_short}</p>
        </div>

        <h2 className='output-page-header-text'>Explanation</h2>

        <div className="analysis-block">
          <div className="paragraph-group">
            <h3 className="sub-header">The Neighbourhood</h3>
            <p className='output-page-plain-text'>{result.living_detail}</p>
          </div>

          <div className="paragraph-group">
            <h3 className="sub-header">The Commute</h3>
            <p className='output-page-plain-text'>{result.commute_detail}</p>
          </div>

          <div className="paragraph-group">
            <h3 className="sub-header"> The Financial Impact</h3>
            <p className='output-page-plain-text'>{result.financialImpact}</p>
          </div>

          <div className="paragraph-group">
            <h3 className="sub-header">The Burnout Risk</h3>
            <p className='output-page-plain-text'>{result.burnoutRisk}</p>
          </div>

          <div className="paragraph-group">
            <h3 className="sub-header">Why this works for you</h3>
            <p className='output-page-plain-text'>{result.whyItWorks}</p>
          </div>
        </div>

        <h2 className='output-page-header-text'>Top 3 Action Items</h2>
        <ul className='output-page-plain-text action-list'>
          {result.actionItems?.slice(0, 3).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="external-button-container">
        <button className="new-search-btn" onClick={handleStartOver}>
          Start New Search
        </button>
      </div>
    </div>
  )
}