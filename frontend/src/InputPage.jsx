import { useState } from "react";
import "./InputPage.css";
import "./InputGrid.css";
import InputGrid3 from './InputGrid3.jsx';
import Background from './assets/background.png';
import HeaderComponent from "./HeaderComponent.jsx";

function InputPage() {
  const [gridPage, setGridPage] = useState(1);

  return (
    <>
      <img src={Background} class='background-image' />
      <HeaderComponent />
      <InputGrid2 setGridPage={setGridPage} />
    </>
  );
}

export default InputPage;