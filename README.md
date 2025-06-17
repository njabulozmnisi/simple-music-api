# 🎵 Simple Music API



A RESTful API for managing **tracks** and **playlists**, built with:

- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Swagger (OpenAPI)](https://swagger.io/)
- Docker + Docker Compose for fast deployment

---

## 🚀 Deployed On Render

The API is automatically deployed to **Render** using GitHub integration:

1. Pushes to `main` trigger a new build on Render
2. Prisma migrations are run before start
3. Docker container is built with `platform: linux/amd64`

---

## 🚀 Quick Start (Preferred)

> For the fastest setup, run the API and database using Docker:

```bash
docker-compose up --build
```

- API: `http://localhost:3000`
- Swagger UI: `http://localhost:3000/api`
- DB: PostgreSQL on port `5433`

> 📝 Docker must be installed and running.

---

## 🛠️ Manual Setup (If Docker Is Not an Option)

### 1. Clone the Project

```bash
git clone https://github.com/njabulozmnisi/simple-music-api.git
cd simple-music-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup PostgreSQL Locally

Create a PostgreSQL database called `simplemusicdb` with:

```
host:     localhost  
port:     54332 
user:     postgres  
password: postgres  
database: simplemusicdb
```

You can use tools like **pgAdmin**, **DBeaver**, or `psql` to create it manually.

---

### 4. Configure Environment Variables

Create a `.env` file at the root:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/simplemusicdb
```

---

### 5. Apply Migrations and Generate Prisma Client

```bash
npx prisma generate
npx prisma migrate deploy
```

> If running locally for the first time and the DB is fresh:

```bash
npx prisma migrate dev --name init
```

---

### 6. Start the Application

```bash
npm run start:dev
```

---

## 📖 API Documentation

- Swagger UI: [http://localhost:3000/api](http://localhost:3000/api)
- Swagger JSON (for Postman import): [http://localhost:3000/api-json](http://localhost:3000/api-json)

---

## 🧩 API Features

### 🎶 Tracks

- Create, update, delete, and retrieve tracks
- Enforces `(title, artist)` uniqueness

### 📻 Playlists

- Full CRUD functionality
- Add/remove tracks to/from playlists
- Lazy-load or eager-load tracks with query option
- Prevent:
  - Duplicates in playlists
  - Deleting playlists that still contain tracks
  - Removing non-existent tracks

---

## 🧼 Clean Up (If Using Docker)

```bash
docker-compose down -v
```

---

## 📬 Contact

**Author:** Njabulo Mnisi  
**Email:** njabulozmnisi@gmail.com
