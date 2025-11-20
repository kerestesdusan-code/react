export const Home = () => {
    return (
        <section className="home p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Welcome to My Personal Portfolio
            </h1>

            <p className="text-lg text-gray-600 mb-8">
                This full-stack application was created to demonstrate my practical software 
                development skills. It combines modern web technologies, REST API design, 
                secure authentication, database work, and real deployment. 
                The project reflects my journey as a self-taught developer preparing for a 
                professional IT career.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Technologies Used</h2>

            <ul className="text-gray-700 leading-relaxed mb-8 space-y-1">
                <li>
                    <strong>Frontend:</strong> React, TypeScript, Tailwind CSS
                </li>
                <li>
                    <strong>Backend:</strong> Node.js, Express, REST API
                </li>
                <li>
                    <strong>Database:</strong> PostgreSQL (secure password hashing, prepared statements)
                </li>
                <li>
                    <strong>Security:</strong> bcrypt, Google reCAPTCHA, validation
                </li>
                <li>
                    <strong>Deployment:</strong> Custom VPS server (Hetzner) + custom domain
                </li>   
                <li>
                    <strong>Source Code:</strong>{" "}
                    <a
                        href="https://github.com/kerestesdusan-code"
                        rel="noopener"
                        className="text-blue-500 hover:text-blue-700"
                    >
                        GitHub Repository
                    </a>
                </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
            <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
                <li>Secure user registration and login with hashed passwords</li>
                <li>Google reCAPTCHA integration for bot protection</li>
                <li>Full CRUD operations with PostgreSQL</li>
                <li>Reusable React components and modern UI with Tailwind CSS</li>
                <li>REST API communication between frontend and backend</li>
                <li>Form validation and clean UX/UI</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Goal</h2>
            <p className="text-lg text-gray-600 mb-8">
                My main goal in building this application was to gain real-world experience
                with full-stack development, understand deployment and server configuration,
                and build a strong foundation for a future career in software development.
                I’m continuously improving my skills in React, TypeScript, Node.js and backend
                architecture, aiming to become a professional developer.
            </p>

            <p className="text-lg font-medium text-gray-800 mb-6">
                Feel free to explore the project or reach out if you’re interested in a 
                collaboration or have any questions.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Disclaimer</h2>
            <p className="text-lg text-gray-600">
                This application is created purely for educational and presentation purposes.  
                Personal data entered in forms is not used for any commercial activity.
            </p>
        </section>
    );
};
