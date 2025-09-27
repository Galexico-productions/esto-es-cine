# 🎬 Movie List App

A personal movie list web application built using the **MVC architecture** and enhanced with **TDD**, **clean code principles**, and **object-oriented programming** practices. The project integrates with **The Movie Database (TMDB) API** and uses **MongoDB (with Mongoose)** for persistence.

---

## 📚 Project Goals

- Practice **Test-Driven Development (TDD)** to guide structure and implementation.
- Apply a **clean, modular architecture** separating concerns across layers.
- Practice **Object-Oriented Programming (OOP)** with a `Movie` domain model.
- Integrate with **external APIs** (TMDB) for real movie data.
- Build a maintainable and extendable full-stack app.
- Manage **user accounts** with authentication and personal movie lists.


---

## ✨ Current Features

- **Movies**
  - Add new movies to the DB from TMDB API.
  - Prevent duplicate movies in DB.
  - Delete movies by ID.
  - Search movies via TMDB integration.
  - List all movies stored in DB.

- **Users**
  - Register new users with email and password.
  - Login/logout functionality.
  - Each user has a `favoriteMovies` list stored in their document.
  - Planned: `POST /users/me/movies` to let users add movies to their list.

- **Architecture**
  - Repositories handle DB queries only.
  - Services coordinate business rules (e.g., add movie + link to user).
  - Controllers map HTTP requests to services.
  - Separation of concerns maintained across layers.

---

## 🌐 Route Map

### Public Routes
| Method | Endpoint           | Description                  |
|--------|--------------------|------------------------------|
| GET    | `/`                | Home page                   |
| GET    | `/search`          | Search movies (global)      |
| POST   | `/users/new-user`  | Register a new user         |
| POST   | `/users/login`     | Login user                  |
| GET    | `/users/logout`    | Logout user                 |

### Movie Routes
| Method | Endpoint                 | Description                  |
|--------|--------------------------|------------------------------|
| POST   | `/movies/new-movie`      | Add a new movie to DB        |
| GET    | `/movies/my-movies`      | Get current user's movies    |
| DELETE | `/movies/my-movies/:id`  | Remove movie from user's list|
| GET    | `/movies/search`         | Search movies via TMDB       |

### Planned (Protected User Routes)
| Method | Endpoint                 | Description                          |
|--------|--------------------------|--------------------------------------|
| POST   | `/users/me/movies`       | Add a movie to logged-in user's list |
| GET    | `/users/me/movies`       | Get logged-in user's favorites       |

---

## 🧪 Testing Strategy

This project is being developed using **Test-Driven Development**.

- ✅ Unit tests for TMDB client, repositories, and domain logic.
- 🔄 Refactoring guided by test coverage and responsibility separation.
- 🛠️ Integration tests for user flows (auth + favorites) are in progress.

---

## 🧱 Technologies

- **Node.js + Express** – Backend framework
- **MongoDB + Mongoose** – Database and ODM
- **TypeScript** – Type safety and clean code
- **EJS** – Templating engine (for initial views)
- **Jest** – Testing framework
- **TMDB API** – External movie data source

---

## 🚧 Next Steps

- ⏳ Implement `addMovieToUserService` and `POST /users/me/movies`.
- ⏳ Add middleware for authentication/authorization.
- ⏳ Build user-facing EJS views for favorites.
- ⏳ Add pagination and filtering to movie lists.
- ⏳ Improve UI and user interaction.
- ⏳ Add deployment config and production build.

---

## 🧠 Author Notes

This project is part of my training as a **full-stack developer** and a practical exercise in applying **software architecture patterns**, **clean code**, and **TDD**. It's also a playground to improve my skills in **TypeScript**, **OOP**, and **automated testing**.

---

## 📬 Contact

This project has been made by **Balam Castro**  

**Linkedin** /balamcastro

**github** /ekbalam11

> "Seeing a man dealing so bravely with his demons, fills you with determination."
