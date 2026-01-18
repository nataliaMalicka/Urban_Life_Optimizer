import { useState } from "react";
import "./InputPage.css";
import "./InputGrid.css";
import InputGrid3 from './InputGrid3.jsx';
import Background from './assets/background.png';
import HeaderComponent from "./HeaderComponent.jsx";

function InputPage() {
    const [gridPage, setGridPage] = useState(3);
    const [formData, setFormData] = useState({});

    return (
        <>
            <img src={Background} className='background-image' />
            <HeaderComponent />

            <InputGrid3
                formData={formData}
                setFormData={setFormData}
                setGridPage={setGridPage}
            />
        </>
    );
}

export default InputPage;