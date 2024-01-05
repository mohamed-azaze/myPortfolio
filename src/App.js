import { Route, Routes, BrowserRouter } from 'react-router-dom'
import NavBar from './Components/NavBar/NavBar.jsx';
import Intro from "./Components/Intro/Intro.jsx"
import About from './Components/About/About.jsx';
import Portfolio from './Components/Portfolio/Portfolio.jsx';
import Contact from './Components/Contact/Contact.jsx';
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard.jsx';

function App() {


    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="myportfolio/" element={<Intro />} />
                <Route path='myportfolio/about' element={<About />} />
                <Route path='myportfolio/portfolio' element={<Portfolio />} />
                <Route path='myportfolio/contact' element={<Contact />} />
                <Route path='myportfolio/dashboard' element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;




