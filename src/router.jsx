import { createBrowserRouter, Navigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import AddProjectForm from './Components/Dashboard/AddProjectForm/AddProjectForm';
import Intro from './Components/Intro/Intro';
import About from './Components/About/About';
import Portfolio from './Components/Portfolio/Portfolio';
import Contact from './Components/Contact/Contact';
import GuestLayout from './Components/GuestLayout/GuestLayout';
import ContainerTables from './Components/Dashboard/ContainerTables/ContainerTables';
import AddLangorTool from './Components/Dashboard/AddLangorTool/AddLangorTool';
import Login from './Components/Dashboard/Login/Login';


const router = createBrowserRouter([
    {
        path: 'myportfolio/dashboard',
        element: <Dashboard />,
        children: [
            {
                path: 'myportfolio/dashboard',
                element: <Navigate to='/dashboard' />,
            },
            {
                path: '/myportfolio/dashboard',
                element: <ContainerTables />
            },
            {
                path: 'add_project',
                element: <AddProjectForm />
            },
            {
                path: 'add_project/:id',
                element: <AddProjectForm />
            },
            {
                path: 'add_lang_tool',
                element: <AddLangorTool />
            },
            {
                path: 'add_lang_tool/:id',
                element: <AddLangorTool />
            }
        ]

    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to='/myportfolio' />,
            },
            {
                path: '/myportfolio',
                element: <Intro />,
            },
            {
                path: "myportfolio/about",
                element: <About />
            },
            {
                path: "myportfolio/portfolio",
                element: <Portfolio />
            },
            {
                path: "myportfolio/contact",
                element: <Contact />
            },
            {
                path: "myportfolio/login",
                element: <Login />
            }
        ]
    }
])

export default router;
