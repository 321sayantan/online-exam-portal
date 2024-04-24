
# Online Examination Portal (EXAMGROUND)

Welcome to the Online Examination Portal repository! This project aims to provide a platform for conducting online examinations. This README will guide you through the setup and usage of the application.


## Table of Contents

- [Features](#Features)
- [Installation](#Installation)
- [Screenshots](#Screenshots)
- [Usage](#Usage)
- [Contributing](#Contributing)
- [License](#License)
## Features

- User authentication and authorization.
- Authentication using Google.
- Once logged in, it is stored in a session for 5 minutes.
- Randomized questions for each attempt.
- Detailed result analysis for both students and administrators.
- Admin panel for managing users, exams, and results.
- Responsive design for seamless usage across devices.

## Installation

To run the Online Examination Portal locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/321sayantan/online-exam-portal.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd online-exam-portal
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up environment variables:**

   Create a `.env` file in the root directory and define the following variables:

   ```plaintext
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/exam_portal
   SESSION_SECRET=your_session_secret
   ```

   Make sure to replace `your_session_secret` with a secure random string for session management.

5. **Start the server:**

   ```bash
   node index.js
   ```

   This will start the server at `http://localhost:3000`.

6. **Initialize the database:**

   Navigate to `http://localhost:3000/setup` in your browser to set up the initial admin user and exam categories.
## Screenshots

Login Page:<br>
![/images/Screenshot 2024-04-24 164500.png](https://github.com/321sayantan/online-exam-portal/blob/main/images/Screenshot%202024-04-24%20164500.png?raw=true)

SignUp Page:<br>
![[App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)](https://github.com/321sayantan/online-exam-portal/blob/main/images/Screenshot%202024-04-24%20164716.png?raw=true)

Dashboard:<br>
![[App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)
](https://github.com/321sayantan/online-exam-portal/blob/main/images/Screenshot%202024-04-24%20165730.png?raw=true)

Password Encryption:<br>
![[App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)](https://github.com/321sayantan/online-exam-portal/blob/main/images/Screenshot%202024-04-24%20165950.png?raw=true)

## Tech Stack

**Client:** HTML, CSS, Bootstrap, EJS,

**Server:** Node, Express.

**DataBase:** MongoDB.

**Authentication:** Google OAuth.

**Password Hashing:** bcrypt.

**Session:** express.session.
## Usage

Once the server is running and the initial setup is completed, you can access the Online Examination Portal through your web browser at `http://localhost:3000`.

- **Student Dashboard:**
  - Students can log in to attempt exams, view their results, and analyze their performance.
  - They can select an exam, answer questions, and submit their responses within the time limit.

- **Admin Panel:**
  - Administrators can log in to manage users, exams, and results.
  - They have access to features like creating, editing, and deleting exams, viewing detailed result analysis, and managing user accounts.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Create a new pull request.
## License

This project is licensed under the [MIT License](LICENSE). Feel free to modify and distribute this code for your own projects.

---

Thank you for using the Online Examination Portal! If you encounter any issues or have suggestions for improvements, please don't hesitate to open an issue or reach out to the maintainers.
