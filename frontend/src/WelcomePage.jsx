import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useNavigate } from 'react-router-dom'
import './WelcomePage.css'
import Background from './assets/background.png'
import RightArrow from './assets/right-arrow.png'

export default function WelcomePage() {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/InputPage');
  }

  return (
    <>
      <img src={Background} class='background-image' />
      <div class='base'>
        <div id='welcome-page-content'>
          <h5 id='welcome-page-greeting'>
            Welcome to
          </h5>
          <h3 id='welcome-page-title'>
            Urban Life Optimizer
          </h3>
          <div id='welcome-page-horizontal-line' />
          <div id='welcome-page-div-button' onClick={handleClick}>
            <p id='welcome-page-div-button-text'>Get Started</p>
            <img src={RightArrow} id='welcome-page-div-button-img' />
          </div>
        </div>
      </div >
    </>
  )
}
