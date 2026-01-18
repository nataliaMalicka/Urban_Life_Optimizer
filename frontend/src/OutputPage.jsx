import { useState } from 'react'
import Background from './assets/background.png'
import HeaderComponent from './HeaderComponent'
import './OutputPage.css'

export default function OutputPage() {
  const [result, setResult] = useState({
    living: "Placeholder living",
    commute: "Placeholder commute",
    commuteTime: "Placeholder commute time",
    car: "Placeholder car",
    explanation: "Placeholder explanation"
  })
  return (
    <>
      <img src={Background} class='background-image' />
      <HeaderComponent />
      <div id='output-page-container'>
        <h2 id='output-page-recommended-title' class='output-page-header-text'>
          Recommended Lifestyle Plan:
        </h2>
        <p class='output-page-plain-text'><strong>Living:</strong> {result.living}</p>
        <p class='output-page-plain-text'><strong>Commute:</strong> {result.commute}</p>
        <p class='output-page-plain-text'><strong>Commute Time:</strong> {result.commuteTime}</p>
        <p class='output-page-plain-text'><strong>Car:</strong> {result.car}</p>
        <h2 class='output-page-header-text'>Explanation</h2>
        <p class='output-page-plain-text'>{result.explanation}</p>
      </div>
    </>
  ) // stub
}