import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import WelcomePage from './WelcomePage'
import InputPage from './InputPage'

export default function PageRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/WelcomePage" replace/>}/>
                <Route path="/WelcomePage" element={<WelcomePage />} />
                <Route path="/InputPage" element={<InputPage />} />
            </Routes>
        </BrowserRouter>
    );
}