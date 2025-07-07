# 🎬 Movie List App

A personal movie list web application built using the **MVC architecture** and enhanced with **TDD**, **clean code principles**, and **object-oriented programming** practices. The project integrates with **The Movie Database (TMDB) API** and uses **MongoDB (with Mongoose)** for persistence.

---

## 📚 Project Goals

- Practice **Test-Driven Development (TDD)** to guide structure and implementation.
- Apply a **clean, modular architecture** separating concerns across layers.
- Practice **Object-Oriented Programming (OOP)** with a `Movie` domain model.
- Integrate with **external APIs** (TMDB) for real movie data.
- Build a maintainable and extendable full-stack app.

---

## 🏗️ Current Architecture

/src
/controllers
movie.controller.ts # Request handling, calls domain/repository
/models
Movie.model.ts # Mongoose schema for Movie
/repositories
Movie.repository.ts # DB access logic (MongoDB via Mongoose)
/services
movie.domain.ts # OOP domain logic (Movie class, rules)
/clients
TMDBClient.ts # Handles TMDB API requests
/views
movie.view.ts # Prepares movie data for rendering
/routes
movie.routes.ts # Route definitions
/tests
... # All unit/integration tests



---

## 🧪 Testing Strategy

This project is being developed using **Test-Driven Development**.

- ✅ Layer-by-layer unit tests:
  - TMDB client
  - Repository
  - Domain logic (Movie class)
  - Controllers
- 🔄 Refactoring guided by test coverage and responsibility separation
- 🛠️ Integration and functional tests to be added as features evolve

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

- ✅ Finish testing and restructuring all logic layers
- ⏳ Integrate domain logic and views
- ⏳ Add functionality: favorites, search, pagination, etc.
- ⏳ Improve UI and user interaction
- ⏳ Add deployment config and production build

---

## 🧠 Author Notes

This project is part of my training as a **full-stack developer** and a practical exercise in applying **software architecture patterns**, **clean code**, and **TDD**. It's also a playground to improve my skills in **TypeScript**, **OOP**, and **automated testing**.

---

## 📬 Contact

This project has been made by Balam Castro 

Seeing a man dealing so bravely with his demons, fills you with determination.


