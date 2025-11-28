import { Link, Outlet, useLocation } from "react-router-dom";

export const Projects = () => {
  const location = useLocation();
  const isRoot = location.pathname === "/projects";

  return (
    <section className="px-4 py-10 md:py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="max-w-3xl space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            My Projects
          </h1>

          <p className="text-lg text-slate-700">
            This section showcases several small projects that I built to practice and
            demonstrate different parts of the full-stack JavaScript / TypeScript ecosystem.
            Each project focuses on a specific area – from basic React state management,
            through form handling and validation, up to working with a real database and
            secure backend API.
          </p>

          <p className="text-slate-700">
            The projects are ordered in a way that roughly reflects increasing{" "}
            <span className="font-semibold text-indigo-600">complexity</span> and{" "}
            <span className="font-semibold text-indigo-600">required skills</span>.
            Starting with simple UI logic, then moving to more advanced forms, dynamic lists
            and finally to features like user management, authentication and PostgreSQL
            integration. Together they show how I think about code structure, reusability
            and clean UX.
          </p>

          <p className="text-slate-700">
            Feel free to click on any of the projects below – each of them represents
            a small but important step in my learning path as a future{" "}
            <span className="font-semibold">full-stack developer</span>.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <Link
            to="calculator"
            className="block bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md hover:border-indigo-200 transition"
          >
            <h2 className="text-xl font-semibold text-slate-900 mb-1">
              Calculator
            </h2>
            <p className="text-sm text-slate-600 mb-3">
              A simple React calculator demonstrating component state, user input handling
              and basic UI composition with TypeScript.
            </p>
            <p className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
              React • TypeScript • Component state
            </p>
          </Link>

          <Link
            to="letters-game"
            className="block bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md hover:border-indigo-200 transition"
          >
            <h2 className="text-xl font-semibold text-slate-900 mb-1">
              Letters Game
            </h2>
            <p className="text-sm text-slate-600 mb-3">
              A small game focused on working with state, simple game logic, conditional
              rendering and user feedback in the UI.
            </p>
            <p className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
              React • Game logic • Conditional UI
            </p>
          </Link>

          <Link
            to="employee-list"
            className="block bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md hover:border-indigo-200 transition"
          >
            <h2 className="text-xl font-semibold text-slate-900 mb-1">
              Employee List
            </h2>
            <p className="text-sm text-slate-600 mb-3">
              Demonstrates dynamic lists, CRUD-like operations on the frontend and
              working with reusable components and forms.
            </p>
            <p className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
              React • Forms • Lists
            </p>
          </Link>

          <Link
            to="users-list"
            className="block bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md hover:border-indigo-200 transition"
          >
            <h2 className="text-xl font-semibold text-slate-900 mb-1">
              Users List (Full-stack)
            </h2>
            <p className="text-sm text-slate-600 mb-3">
              A full-stack module connected to a PostgreSQL database. Includes user
              listing, updating and deleting via a Node.js / Express REST API.
            </p>
            <p className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
              React • Node.js • Express • PostgreSQL
            </p>
          </Link>
        </div>

        <div className="mt-6">
          {isRoot && (
            <p className="text-sm text-slate-500 mb-4">
              Choose a project above to see it in action. Each project opens directly on
              this page without a full page reload thanks to React Router.
            </p>
          )}

          <Outlet />
        </div>
      </div>
    </section>
  );
};
