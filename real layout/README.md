# Web-Project

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/GeorgeAyy/Web-Project-Layout.git
   ```

2. **Install dependencies:**

   Navigate to the project directory and install the required npm packages:

   ```bash
   cd Web-Project-Layout
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory of the project and add the following variables:

   ```plaintext
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/demo-app
   SESSION_SECRET=your_session_secret
   ```

   Replace `your_session_secret` with a secret key for session management.
   and `mongodb://localhost:27017/demo-app` with your MongoDB connection URI.

4. **Run the application:**

   Start the Node.js server:

   ```bash
   node app
   ```

   or if you have nodemon installed

   ```bash
    nodemon app
   ```

5. **Access the application:**

   Open your web browser and navigate to `http://localhost:3000` to access the application.

## Usage

- Sign up for a new account by clicking on the "Sign Up" link.
- Log in using your credentials.
- View and update your profile picture in the "Profile" section.
- Log out from your account using the "Logout" link.

## Folder Structure

The project structure is as follows:

- `config`: Contains configuration files.
- `controllers`: Contains route handlers.
- `models`: Contains database models.
- `public`: Contains static assets (CSS, JavaScript, images).
- `routes`: Contains route definitions.
- `views`: Contains EJS view templates.
- `uploads`: Contains uploaded files (profile pictures).
- `README.md`: Setup guide and project information.
- `app.js`: Entry point of the application.
- `.env`: Environment variable configuration file.
- `package.json`: NPM package configuration file.
- `package-lock.json`: Lock file for NPM dependencies.

## License

This project is licensed under the [MIT License](LICENSE).
