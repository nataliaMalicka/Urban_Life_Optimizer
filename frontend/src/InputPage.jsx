import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./InputPage.css";
import "./InputGrid.css";
import InputGrid from './InputGrid.jsx';

function InputPage() {
  return (
    <>
      <div className="headerContainer">
        <p className="title">Urban Life Optimizer</p>
        <div className="line"></div>
      </div>
      <InputGrid />
    </>
  );
}

export default InputPage;
