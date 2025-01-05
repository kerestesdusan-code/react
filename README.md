## How to Run the Application Locally

This project is divided into two parts:

- **Frontend** (located in the `src` directory)
- **Backend** (located in the `server` directory)

To run the application locally, follow these steps:

### Prerequisites

1. Install [Node.js](https://nodejs.org/) (version 16 or later).
2. Install [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/).

### Steps to Run

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/kerestesdusan-code/react.git
   cd react
   ```

2. **Set Up Backend:**

   - Navigate to the `server` directory:
     ```bash
     cd server
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `server` directory with the following default content:
     ```env
     PORT=5000
     DATABASE_URL=your_database_connection_string
     ```
   - Start the backend server:
     ```bash
     npm start
     ```
   - The backend server should now be running on [http://localhost:5000](http://localhost:5000).

3. **Set Up Frontend:**
   - Navigate to the `src` directory:
     ```bash
     cd ../src
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `src` directory with the following default content:
     ```env
     REACT_APP_API_URL=http://localhost:5000
     ```
   - Start the frontend application:
     ```bash
     npm start
     ```
   - The frontend should now be running on [http://localhost:3000](http://localhost:3000).

### Notes

- Ensure that the backend server is running before starting the frontend application.
- If you need to modify any environment variables, update the respective `.env` files.

## Environment Variables(server and src .env)

### Backend (`server/.env`)

| Variable       | Description                              | Default Value                     |
| -------------- | ---------------------------------------- | --------------------------------- |
| `PORT`         | Port for the backend server              | `5000`                            |
| `DATABASE_URL` | Connection string for the database       | `your_database_connection_string` |
| `JWT_SECRET`   | Secret key for JSON Web Token generation | `your_jwt_secret`                 |

### Frontend (`src/.env`)

| Variable            | Description             | Default Value           |
| ------------------- | ----------------------- | ----------------------- |
| `REACT_APP_API_URL` | URL for the backend API | `http://localhost:5000` |

With these settings, you should be able to successfully run the project locally. For further customization or issues, feel free to raise an issue in the repository.
