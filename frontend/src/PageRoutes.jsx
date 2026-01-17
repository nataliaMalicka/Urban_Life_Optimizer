import { Route, Routes } from 'react-router-dom'
import WelcomePage from './WelcomePage'

export default function PageRoutes() {
    return (
        <Routes>
            <Route path="/WelcomePage" element={<WelcomePage />}/>
        </Routes>
    );
}