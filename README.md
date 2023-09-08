# Movieswise

Movieswise is a web application that allows you to discover the latest movies and provides details such as their overview, ratings, cast, and even a YouTube video related to the movie. It's a great tool for movie enthusiasts who want to stay up-to-date with the latest releases and explore additional information about their favorite films.

## Technologies Used

- [Vite](https://vitejs.dev/): A fast development build tool for JavaScript and TypeScript.
- [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [Tailwind CSS](https://tailwindcss.com/): A highly customizable CSS framework for rapidly building modern web applications.
- [TMDB API](https://www.themoviedb.org/documentation/api): The Movie Database (TMDB) API provides access to a vast collection of movie data.

## Environment Variables

To run this project, you'll need to set up the following environment variables:

- `VITE_API_KEY`: Your TMDB API key. You can obtain this key by signing up on the TMDB website.
- `VITE_API_CLERK_PUBLISHABLE_KEY`: Your Clerk API key. Clerk is a service that enables user authentication and other identity-related features.

Make sure to create a `.env` file in the project root directory and add these variables with their respective values.

## Getting Started

Follow these steps to get started with Movieswise:

1. Clone the repository: `git clone https://github.com/yourusername/movieswise.git`
2. Navigate to the project directory: `cd movieswise`
3. Install dependencies: `npm install` or `yarn install`
4. Set up your environment variables in a `.env` file as described above.
5. Start the development server: `npm run dev` or `yarn dev`
6. Open your browser and visit `http://localhost:3000` to access the Movieswise web app.

## Features

- **Latest Movies**: Browse and discover the latest movies with details like release date, overview, and ratings.
- **Search Movies**: Search for any movie and access its rating, cast, and even watch a YouTube video related to the movie.
- **User Authentication**: Implement user authentication and account management using Clerk (API key required).

## Contributing

We welcome contributions to Movieswise! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature-name`
3. Make your changes and commit them with clear messages.
4. Push your branch to your fork: `git push origin feature-name`
5. Create a pull request to the `main` branch of the original repository.

Please make sure to follow our code of conduct and maintain a respectful and inclusive environment for all contributors.

## Acknowledgments

- The Movieswise project is inspired by a love for movies and the desire to create a useful and engaging movie discovery platform.
- We extend our gratitude to the creators of Vite, React, Tailwind CSS, and the TMDB API for their amazing tools and services.

Enjoy using Movieswise to explore the world of cinema!


