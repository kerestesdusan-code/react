export const AboutMe = () => {
    return (
        <section className="p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">About Me</h1>

            <p className="text-gray-700 leading-relaxed mb-4">
                My passion for computers and information technology started in childhood. 
                Inspired by a close friend working in IT, I gradually began exploring programming, 
                web development, and modern technologies. Over time, this curiosity grew into a 
                long-term commitment to learn and build real-world applications.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
                This portfolio project is part of my learning journey. It is a full-stack
                single-page application (SPA) built with 
                {" "}
                <span className="font-semibold text-blue-600">React</span>,{" "}
                <span className="font-semibold text-blue-600">TypeScript</span>,{" "}
                <span className="font-semibold text-blue-600">Node.js</span>,{" "}
                <span className="font-semibold text-blue-600">Express</span>, and{" "}
                <span className="font-semibold text-blue-600">PostgreSQL</span>.
                The project also includes features such as secure user authentication,
                bcrypt-encrypted passwords, form validation, reCAPTCHA protection, reusable UI components, and REST API integration.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
                You can explore the code behind this application in my{" "}
                <a
                    rel="noopener"
                    href="https://github.com/kerestesdusan-code"
                    className="text-blue-500 hover:text-blue-700"
                >
                    GitHub repository
                </a>. 
                The repository reflects not only the technologies I currently work with, but also my progress, 
                dedication, and continuous effort to improve as a developer.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
                Although I am still gaining real-world experience, I am highly motivated to start
                my professional career in the IT industry. I see tremendous potential in this field,
                and I am committed to learning, improving, and bringing value to every team I work with.
            </p>

            <p className="text-gray-700 font-semibold">
                Thank you for visiting my portfolio, and I hope this project reflects my enthusiasm 
                and drive to become a skilled software developer.
            </p>
        </section>
    );
};
