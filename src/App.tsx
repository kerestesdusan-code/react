import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, } from 'react-router-dom';
import Layout from './components/Layout';
import { Projects } from './components/Pages/Projects/Projects';
import { AboutMe } from './components/Pages/AboutMe/AboutMe';
import { ContactFrom } from './components/Pages/ContactForm/ContactForm';

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
            element: <Projects />
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
