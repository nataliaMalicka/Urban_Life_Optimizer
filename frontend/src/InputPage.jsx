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
      <HeaderComponent/>
      {gridPage == 1 && <InputGrid />}
      {gridPage == 2 && <InputGrid2 />}
      {gridPage == 3 && <InputGrid3 />}
    </>
  );
}

export default InputPage;