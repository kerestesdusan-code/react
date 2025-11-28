export const AboutMe = () => {
  return (
    <section className="px-4 py-10 md:py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto md:grid md:grid-cols-3 md:gap-10 items-start">
        <div className="md:col-span-2 space-y-6 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            About Me
          </h1>

          <p className="text-slate-700 leading-relaxed">
            My passion for computers and information technology started in childhood. 
            Inspired by a close friend working in IT, I gradually began exploring programming,
            web development, and modern technologies. Over time, this curiosity grew into a
            long-term commitment to learn and build real-world applications.
          </p>

          <p className="text-slate-700 leading-relaxed">
            This portfolio project is part of my learning journey. It is a full-stack
            single-page application (SPA) built with{" "}
            <span className="font-semibold text-indigo-600">React</span>,{" "}
            <span className="font-semibold text-indigo-600">TypeScript</span>,{" "}
            <span className="font-semibold text-indigo-600">Node.js</span>,{" "}
            <span className="font-semibold text-indigo-600">Express</span> and{" "}
            <span className="font-semibold text-indigo-600">PostgreSQL</span>.
            The project also includes secure user authentication, bcrypt-encrypted passwords,
            reCAPTCHA protection, reusable UI components, form validation and REST API integration.
          </p>

          <p className="text-slate-700 leading-relaxed">
            You can explore the code behind this application in my{" "}
            <a
              rel="noopener"
              href="https://github.com/kerestesdusan-code"
              className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2"
            >
              GitHub repository
            </a>. The repository reflects not only the technologies I currently work with,
            but also my progress, dedication and continuous effort to improve as a developer.
          </p>

          <p className="text-slate-700 leading-relaxed">
            Although I am still gaining real-world experience, I am highly motivated to start
            my professional career in the IT industry. I see tremendous potential in this field
            and I am committed to learning, improving and bringing value to every team I work with.
          </p>

          <p className="text-slate-800 font-semibold">
            Thank you for visiting my portfolio, and I hope this project reflects my enthusiasm
            and drive to become a skilled software developer.
          </p>
        </div>

        <aside className="mt-8 md:mt-0 space-y-4">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 mb-2">
              Profile
            </p>
            <p className="text-sm text-slate-700 mb-4">
              Self-taught developer focusing on modern JavaScript / TypeScript stack and
              real-world full-stack projects.
            </p>

            <div className="space-y-3 text-sm text-slate-700">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Current focus
                </p>
                <p className="font-medium text-slate-900">
                  React, TypeScript, Node.js, PostgreSQL
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Target role
                </p>
                <p className="font-medium text-slate-900">
                  Junior Full-stack / Frontend Developer
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 mb-3">
              Core Skills
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-50 text-indigo-700">
                React & TypeScript
              </span>
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700">
                Node.js & Express
              </span>
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700">
                PostgreSQL & SQL
              </span>
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700">
                REST API
              </span>
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700">
                Auth & Security
              </span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};
