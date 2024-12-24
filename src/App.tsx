import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, } from 'react-router-dom';
import Layout from './components/Layout';
import { Projects } from './components/Pages/Projects/Projects';
import { AboutMe } from './components/Pages/AboutMe/AboutMe';
import ContactFrom from './components/Pages/ContactForm/ContactForm';
import Calculator from './components/Pages/Projects/Calculator/Calculator';
import Game from './components/Pages/Projects/LettersGame/Game';
import EmployeeList from './components/Pages/Projects/EmployeeList/EmployeeList';
import Login from './components/Pages/Login/Login';
import Register from './components/Pages/Register/Register';
import UserList from "./components/Pages/Projects/UserList/UserList";



function ErrorPage() {
  return (
    <div>
      <h1>Oops!</h1>
      <p>Something went wrong or the page was not found.</p>
    </div>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout empty={true} />,
      errorElement: <ErrorPage />,
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
                path: "calculator",
                element: <Calculator />
              },
              {
                path: "letters-game",
                element: <Game />
              },
              {
                path: "employee-list",
                element: <EmployeeList />
              },
              {
                path: "users-list",
                element: <UserList />
              }
            ]
          },
          {
            path: "login",
            element: <Login />
          },
          {
            path: "register",
            element: <Register />
          },
        ]
    }
  ]);

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