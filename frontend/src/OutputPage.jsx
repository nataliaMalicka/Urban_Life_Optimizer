import { useEffect, useState } from 'react'
import Background from './assets/background.png'
import HeaderComponent from './HeaderComponent'
import './OutputPage.css'
import { useLocation } from 'react-router-dom'

export default function OutputPage() {
  const location = useLocation();

  const [result, setResult] = useState({
    living: "Placeholder living",
    commute: "Placeholder commute",
    commuteTime: "Placeholder commute time",
    car: "Placeholder car",
    explanation: "Placeholder explanation"
  })

  useEffect(() => {
    const data = location.state;
    setResult(prev => ({
      ...prev,
      explanation: data
    }))
  }, []);

  return (
    <>
      <img src={Background} className='background-image' />
      <HeaderComponent />
      <div id='output-page-container'>
        <h2 id='output-page-recommended-title' className='output-page-header-text'>
          Recommended Lifestyle Plan:
        </h2>
        <p className='output-page-plain-text'><strong>Living:</strong> {result.living}</p>
        <p className='output-page-plain-text'><strong>Commute:</strong> {result.commute}</p>
        <p className='output-page-plain-text'><strong>Commute Time:</strong> {result.commuteTime}</p>
        <p className='output-page-plain-text'><strong>Car:</strong> {result.car}</p>
        <h2 className='output-page-header-text'>Explanation</h2>
        <p className='output-page-plain-text'>{result.explanation}</p>
      </div>
    </>
  ) // stub
}