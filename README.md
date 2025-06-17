# 💰 Finn — Personal Finance Backend API

**Finn** is a backend service for a personal finance application. It provides APIs to manage transactions, categories, and future features like budgets and financial goals. Built with scalability and developer experience in mind.

## 🚀 Tech Stack

- **Node.js** + **Express**
- **TypeScript**
- **Prisma ORM** (PostgreSQL)
- **Zod** (schema validation)
- **Docker** (optional)
- **ESLint** + **Prettier**

## 📁 Project Structure

/prisma        - Contains the Prisma schema and database migrations  
/scripts       - Utility scripts for setup and maintenance  
/src           - Main application source code
  |_ controllers   - Handles incoming requests
  |_ routes        - Defines API endpoints
  |_ services      - Business logic layer
  |_ middlewares   - Middlewares for auth, validation, etc.
  |_ utils         - Utility/helper functions


## 🧪 Setup

**Clone the repository:**

    git clone https://github.com/itfelipe/backend-finn.git
    cd backend-finn

**Install dependencies:**

    npm install

**Set up environment variables:**

    cp .env.example .env
    # Edit the .env file with your database credentials and configs

**Generate Prisma client:**

    npx prisma generate

**Run migrations (if needed):**

    npx prisma migrate dev

**Start the development server:**

    npm run dev

## 📮 Endpoints (WIP)

> Full API documentation coming soon. For now, check route definitions in `/src/routes`.

## 📌 Features

- Clean, modular architecture
- Zod-based input validation
- RESTful endpoints for categories and transactions
- Ready to scale with authentication and user management

## 📄 License

This project is licensed under the MIT License.
