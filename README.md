# EventEase Frontend

A modern, responsive frontend application for EventEase, an event management platform. Built with React, Vite, and Firebase, featuring user authentication and protected routes.

## Features

- **User Authentication**: Email/password registration and login via backend API, plus Google sign-in with Firebase
- **Protected Routes**: Dashboard accessible only to authenticated users
- **Responsive Design**: Styled with Tailwind CSS for mobile-first design
- **Fast Development**: Powered by Vite for quick builds and hot module replacement
- **Deployment Ready**: Configured for deployment to GitHub Pages

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Authentication**: Firebase (Google sign-in) + Custom backend API
- **State Management**: React Context
- **Deployment**: GitHub Pages (gh-pages)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Hillary90/frontend-eventease.git
   cd frontend-eventease
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and update the environment variables:
   ```bash
   cp .env.example .env
   ```

   Then edit `.env` with your actual values:
   ```env
   VITE_API_URL=http://localhost:5000  # Your backend API URL
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality checks
- `npm run deploy` - Deploy to GitHub Pages (requires `npm run build` first)

## Project Structure

```
src/
├── api/                 # API service functions
├── assets/              # Static assets
├── component/           # Reusable components
├── context/             # React context providers
├── pages/               # Page components
├── App.jsx              # Main app component
├── config.js            # Configuration constants
├── firebase.js          # Firebase initialization
├── main.jsx             # App entry point
└── index.css            # Global styles
```

## Authentication

The app supports two authentication methods:

1. **Email/Password**: Via backend API endpoints (`/auth/register`, `/auth/login`)
2. **Google Sign-In**: Using Firebase Authentication

Firebase configuration is optional - the app will work without it, hiding the Google sign-in option.

## Deployment

The app is configured for deployment to GitHub Pages:

1. Build the app:
   ```bash
   npm run build
   ```

2. Deploy:
   ```bash
   npm run deploy
   ```

The deployed app is available at: [https://hillary90.github.io/frontend-eventease](https://hillary90.github.io/frontend-eventease)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `npm run lint`
5. Test your changes
6. Submit a pull request

## License

This project is private and not open for public use.
