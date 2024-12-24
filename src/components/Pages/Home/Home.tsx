export const Home = () => {
    return (
        <section className="home p-8">
            <div className="flex justify-end space-x-4 mb-4">
            </div>

            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to My Personal Portfolio</h1>
                <p className="text-lg text-gray-600 mb-8">
                    This application was created as a demonstration of my software development skills, combining modern technologies and web development principles. Its purpose is not only to showcase my technical stack but also to present real experience with a complex project from design to deployment.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Technologies Used</h2>
                <ul className="text-gray-700 leading-relaxed mb-4">
                    <li><strong>Frontend:</strong> React + TypeScript, Tailwind CSS</li>
                    <li><strong>Backend and Database:</strong> CouchDB, REST API</li>
                    <li><strong>Deployment and Hosting:</strong> Paid server and custom domain</li>
                    <li><strong>Source Code:</strong> <a href="https://github.com/kerestesdusan-code" rel="noopener" className="text-blue-500 hover:text-blue-700">GitHub</a></li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
                <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
                    <li>Dynamic content and updates based on user interactions</li>
                    <li>Validated forms for data integrity</li>
                    <li>CRUD operations with CouchDB for data management</li>
                    <li>User authentication and authorization</li>
                    <li>HTTP communication</li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Goal</h2>
                <p className="text-lg text-gray-600 mb-8">
                    My main goals for developing this application were practical implementation of theoretical knowledge, mastering the entire development cycle, gaining deployment experience, and focusing on detailed UX/UI. I hope this project provides a clear view of my technical skills and my approach to software development.
                </p>

                <p className="text-lg font-medium text-gray-800 mb-4">
                    I invite you to test the application or contact me with any questions or interest in collaboration.
                </p>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Disclaimer</h2>
                <p className="text-lg text-gray-600 mb-4">
                    This application is purely for educational and presentation purposes. No personal data is collected, stored, or processed in any way.
                </p>
            </div>
        </section>
    );
};
