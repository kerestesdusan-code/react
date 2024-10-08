import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, } from 'react-router-dom';
import Layout from './components/Layout';
import { Projects } from './components/Pages/Projects/Projects';
import { AboutMe } from './components/Pages/AboutMe/AboutMe';
import { ContactFrom } from './components/Pages/ContactForm/ContactForm';
import EmployeeList from './components/Pages/Projects/EmployeeList/EmployeeList';
import Calculator from './components/Pages/Projects/Calculator/Calculator';
import Game from './components/Pages/Projects/LettersGame/Game';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout empty={true} />,
      children:
        [
          {
            path: "about-me",
            element: <AboutMe />
          },
          {
            path: "contact-form",
            element: <ContactFrom />
          },

          {
            path: "projects",
            element: <Projects />,
            children: [
              {
                path: "employees",
                element: <EmployeeList />
              },
              {
                path: "calculator",
                element: <Calculator />
              },
              {
                path: "letters-game",
                element: <Game />
              }
            ]
          }
        ]
    }
  ])

  return (
    <div className="App">
      <div>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </div>
    </div>
  );
}

export default App;
