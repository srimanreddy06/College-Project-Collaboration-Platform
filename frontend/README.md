# College Project Collaboration Platform - Frontend

A modern, clean React frontend for facilitating collaboration on college projects. This platform allows students to browse, create, and join projects across various categories like Web Apps, Mobile Apps, IoT, and Research.

## Features

- **Project Discovery**: Browse and search through student projects.
- **User Dashboard**: View your projects, collaborations, and activity stats.
- **Project Creation**: Easy-to-use form to post new project ideas and find teammates.
- **Authentication**: Login and Registration pages (simulated for UI demo).
- **Responsive Design**: Works on desktop and mobile devices.

## Tech Stack

- **React.js**: UI Library
- **CSS3**: Styling (Flexbox, CSS Variables, Responsive Media Queries)
- **React Router**: Client-side routing
- **Axios**: API requests (configured)

## Getting Started

### Prerequisites

- Node.js installed on your machine.

### Installation

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Application

To start the development server:

```bash
npm start
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) (or 3001 if 3000 is taken) to view it in your browser.

The page will reload when you make changes.

## Project Structure

- `src/components`: Reusable UI components like `Navbar` and `ProjectCard`.
- `src/pages`: Main application views (`Login`, `Register`, `Dashboard`, `Projects`, `CreateProject`).
- `src/api`: API configuration.
