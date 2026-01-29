import myFoto from "../../../assets/my-foto.png";

export const Home = () => {
  return (
    <section className="home px-4 py-10 md:py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto md:grid md:grid-cols-2 md:gap-12 items-start">
        <div className="space-y-6 max-w-xl">
          <div className="flex items-center gap-5">
            <img
              src={myFoto}
              alt="Dušan Keresteš"
              className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-purple-400 shadow-lg"
            />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                Welcome to My Personal Portfolio
              </h1>
              <p className="text-sm md:text-base text-slate-600 mt-1">
                Dušan Keresteš
              </p>
            </div>
          </div>

          <p className="text-lg text-slate-700">
            This full-stack application was created to demonstrate my practical software
            development skills. It combines modern web technologies, REST API design,
            secure authentication, database work, and real deployment. The project reflects
            my journey as a self-taught developer preparing for a professional IT career.
          </p>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">
              Technologies Used
            </h2>
            <ul className="text-slate-700 leading-relaxed space-y-1">
              <li>
                <strong className="text-indigo-600">Frontend:</strong> React, TypeScript, Tailwind CSS
              </li>
              <li>
                <strong className="text-indigo-600">Backend:</strong> Node.js, Express, REST API
              </li>
              <li>
                <strong className="text-indigo-600">Database:</strong> PostgreSQL (secure password hashing, prepared statements)
              </li>
              <li>
                <strong className="text-indigo-600">Security:</strong> bcrypt, Google reCAPTCHA, validation
              </li>
              <li>
                <strong className="text-indigo-600">Deployment:</strong> Custom VPS server (Hetzner) + custom domain
              </li>
              <li>
                <strong className="text-indigo-600">Source Code:</strong>{" "}
                <a
                  href="https://github.com/kerestesdusan-code"
                  rel="noopener"
                  className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2"
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">
              My Goal
            </h2>
            <p className="text-lg text-slate-700">
              My main goal in building this application was to gain real-world experience
              with full-stack development, understand deployment and server configuration,
              and build a strong foundation for a future career in software development.
              I’m continuously improving my skills in React, TypeScript, Node.js and backend
              architecture, aiming to become a professional developer.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">
              Disclaimer
            </h2>
            <p className="text-lg text-slate-600">
              This application is created purely for educational and presentation purposes.
              Personal data entered in forms is not used for any commercial activity.
            </p>
          </div>
        </div>

        <aside className="mt-10 md:mt-0 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600 mb-1">
              About this project
            </p>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Full-stack JS Portfolio
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              Built as a learning and portfolio project focusing on real-world technologies:
              authentication, database, API communication and deployment.
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-50 text-indigo-700">
                React & TypeScript
              </span>
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700">
                Node.js & Express
              </span>
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700">
                PostgreSQL
              </span>
            </div>

            <div className="flex flex-col gap-2 text-sm text-slate-700">
              <div className="flex justify-between">
                <span>Current focus:</span>
                <span className="font-medium text-slate-900">
                  React, TS, backend
                </span>
              </div>
              <div className="flex justify-between">
                <span>Target role:</span>
                <span className="font-medium text-slate-900">
                  Junior Full-stack Developer
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="/projects"
                className="flex-1 inline-flex justify-center items-center px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition"
              >
                View Projects
              </a>
              <a
                href="/contact-form"
                className="flex-1 inline-flex justify-center items-center px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 transition"
              >
                Contact Me
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
              <p className="text-xs text-slate-500 uppercase tracking-wide">
                Experience
              </p>
              <p className="text-lg font-bold text-slate-900">Self-taught</p>
              <p className="text-xs text-slate-600 mt-1">
                Focused on real projects and continuous learning.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
              <p className="text-xs text-slate-500 uppercase tracking-wide">
                Main stack
              </p>
              <p className="text-lg font-bold text-slate-900">JS / TS</p>
              <p className="text-xs text-slate-600 mt-1">
                React, Node.js, PostgreSQL, REST API.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};
