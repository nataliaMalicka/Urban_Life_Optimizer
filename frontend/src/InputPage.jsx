import { useState, useRef } from "react";
import "./InputPage.css";
import "./InputGrid.css";
import InputGrid from "./InputGrid.jsx";
import InputGrid2 from './InputGrid2.jsx';
import InputGrid3 from './InputGrid3.jsx';
import Background from './assets/background.png';
import HeaderComponent from "./HeaderComponent.jsx";

function InputPage() {
  const [gridPage, setGridPage] = useState(1);
  const [formData, setFormData] = useState({
    homePostalCode: "",
    officePostalCode: "",
    transportationMethod: "",
    commuteTime: "",
    maxCommuteTimeTolerance: "",

    daysOfWork: "",
    workHours: "",
    hasDog: "",
    hasChildren: "",
    roommatePreference: "",

    monthlyIncome: "",
    monthlyBudget: "",
    rentExpense: ""
  })

  return (
    <>
      <img src={Background} className='background-image' />
      <HeaderComponent />
      {gridPage == 1 && <InputGrid setGridPage={setGridPage} formData={formData} setFormData={setFormData} />}
      {gridPage == 2 && <InputGrid2 setGridPage={setGridPage} formData={formData} setFormData={setFormData} />}
      {gridPage == 3 && <InputGrid3 setGridPage={setGridPage} formData={formData} setFormData={setFormData} />}
    </>
  );
}

export default InputPage;