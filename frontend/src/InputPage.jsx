import { useState } from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './InputPage.css'

function InputPage() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="headerContainer">
        <h1 className="title">Urban Life Optimizer</h1>
        <div className="line"></div>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        This is the Input Page
      </p>
    </>
  );
}

export default InputPage;
