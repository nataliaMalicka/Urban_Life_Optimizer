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
      <img src={Background} className='background-image' />
      <div className='base'>
        <div id='welcome-page-content'>
          <h5 id='welcome-page-greeting' className='title-style'>
            Welcome to
          </h5>
          <h3 id='welcome-page-title' className='title-style'>
            Urban Life Optimizer
          </h3>
          <div className='horizontal-line' />
          <div id='welcome-page-div-button' onClick={handleClick}>
            <p id='welcome-page-div-button-text'>Get Started</p>
            <img src={RightArrow} id='welcome-page-div-button-img' />
          </div>
        </div>
      </div >
    </>
  )
}
