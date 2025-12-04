import { Link, Outlet, useLocation } from "react-router-dom";

export const Projects = () => {
  const location = useLocation();
  const isRoot = location.pathname === "/projects";

  const segments = location.pathname.split("/").filter(Boolean);
  const projectSlug = segments[1];

  const projectNames: Record<string, string> = {
    "calculator": "Calculator",
    "letters-game": "Letters Game",
    "employee-list": "Employee List",
    "users-list": "Users List (Full-stack)",
  };

  return (
    <section className="px-4 md:px-8 py-10 md:py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link to="/" className="inline-flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  ></path>
                </svg>
                Home
              </Link>
            </li>
            <li>
              <Link to="/projects" className="inline-flex items-center gap-1">
                My Projects
              </Link>
            </li>
            {projectSlug && (
              <li>
                <span className="inline-flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                  {projectNames[projectSlug] ?? projectSlug}
                </span>
              </li>
            )}
          </ul>
        </div>

        <div className="grid gap-10 md:grid-cols-[220px,minmax(0,900px),220px] items-start">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              My Projects
            </h1>

            <p className="text-sm md:text-base text-slate-700">
              This section presents several projects that I created to practice and
              demonstrate different parts of the full-stack JavaScript / TypeScript
              ecosystem. Each project is focused on a specific area – from basic React
              state and UI logic up to database work and secure backend APIs.
            </p>

            <p className="text-sm md:text-base text-slate-700">
              The complexity of the projects gradually increases. It starts with simple
              components and games, continues through form handling and lists, and ends
              with a full-stack module connected to PostgreSQL, including user
              management and authentication-related features.
            </p>

            <p className="text-sm md:text-base text-slate-700">
              Together, these projects show how I approach problem solving, structure
              my code and keep the user experience clear and intuitive while learning
              to become a professional full-stack developer.
            </p>
          </div>

          <div className="flex justify-center">
            <div
              className="
                bg-white rounded-2xl shadow-sm border border-slate-100 
                w-full max-w-[900px]
                min-h-[600px]
                p-4 md:p-6 
              "
            >
              {isRoot && (
                <p className="text-sm text-slate-500 mb-4 text-center">
                  Choose a project from the list on the right to see it here in action.
                </p>
              )}

              <Outlet />
            </div>
          </div>

          <div className="space-y-4 w-full max-w-[220px] mx-auto md:mx-0">
            <Link
              to="calculator"
              className="block bg-white rounded-2xl shadow-sm border border-slate-100 p-4 hover:shadow-md hover:border-indigo-200 transition"
            >
              <h2 className="text-lg font-semibold text-slate-900 mb-1">
                Calculator
              </h2>
              <p className="text-sm text-slate-600 mb-2">
                A simple React calculator showing component state, user input handling
                and basic UI composition with TypeScript.
              </p>
              <p className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
                React • TypeScript • Component state
              </p>
            </Link>

            <Link
              to="letters-game"
              className="block bg-white rounded-2xl shadow-sm border border-slate-100 p-4 hover:shadow-md hover:border-indigo-200 transition"
            >
              <h2 className="text-lg font-semibold text-slate-900 mb-1">
                Letters Game
              </h2>
              <p className="text-sm text-slate-600 mb-2">
                A small game focused on working with state, simple game logic,
                conditional rendering and user feedback.
              </p>
              <p className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
                React • Game logic • Conditional UI
              </p>
            </Link>

            <Link
              to="employee-list"
              className="block bg-white rounded-2xl shadow-sm border border-slate-100 p-4 hover:shadow-md hover:border-indigo-200 transition"
            >
              <h2 className="text-lg font-semibold text-slate-900 mb-1">
                Employee List
              </h2>
              <p className="text-sm text-slate-600 mb-2">
                Demonstrates dynamic lists, CRUD-like operations on the frontend and
                reusable components with forms.
              </p>
              <p className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
                React • Forms • Lists
              </p>
            </Link>

            <Link
              to="users-list"
              className="block bg-white rounded-2xl shadow-sm border border-slate-100 p-4 hover:shadow-md hover:border-indigo-200 transition"
            >
              <h2 className="text-lg font-semibold text-slate-900 mb-1">
                Users List (Full-stack)
              </h2>
              <p className="text-sm text-slate-600 mb-2">
                A full-stack module connected to a PostgreSQL database. Includes user
                listing, updating and deleting via a Node.js / Express REST API.
              </p>
              <p className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
                React • Node.js • Express • PostgreSQL
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
