import { useState } from "react";
import "./InputPage.css";
import "./InputGrid.css";
import InputGrid from './InputGrid.jsx';
import Background from './assets/background.png'
import HeaderComponent from "./HeaderComponent.jsx";

function InputPage() {
  return (
    <>
      <img src={Background} class='background-image' />
      <HeaderComponent />
      <InputGrid2 setGridPage={setGridPage} />
    </>
  );
}

export default InputPage;