import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "./components/AppLayout";
import Projects from "./components/Pages/Projects/Projects";
import { AboutMe } from "./components/Pages/AboutMe/AboutMe";
import { Home } from "./components/Pages/Home/Home";
import ContactForm from "./components/Pages/ContactForm/ContactForm";
import Calculator from "./components/Pages/Projects/Calculator/Calculator";
import Game from "./components/Pages/Projects/LettersGame/Game";
import EmployeeList from "./components/Pages/Projects/EmployeeList/EmployeeList";
import Login from "./components/Pages/Login/Login";
import Register from "./components/Pages/Register/Register";
import Users from "./components/Pages/Users";
import Groups from "./components/Pages/Groups";

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
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element:< Home />},

        { path: "about-me", element: <AboutMe /> },
        { path: "contact-form", element: <ContactForm /> },

        { path: "users", element: <Users /> },
        { path: "groups", element: <Groups />},

        {
          path: "projects",
          element: <Projects />,
          children: [
            { path: "calculator", element: <Calculator /> },
            { path: "letters-game", element: <Game /> },
            { path: "employee-list", element: <EmployeeList /> },

          ],
        },

        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },
  ]);

  return (
    <div className="App">
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </div>
  );
}

export default App;
