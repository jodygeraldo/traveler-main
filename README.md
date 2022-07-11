# Traveler Main App

This is basically an app for `Genshin Impact` nerds to use to max out EVERYTHING.
The app currently live [here](https://traveler-main.fly.dev/).

## Development

### 1. Fork the project

### 2. Install dependencies

```sh
npm install
```

### 3. Setup environment variables

This project using [PlanetScale](https://planetscale.com/) with [Prisma](https://www.prisma.io/).

```env
cp .env.example .env
```

Change DATABASE_URL in .env to your mysql database connection string.

### 4. Prisma migration

```sh
npx prisma db push
```

This setup characters, items and an initial user with the following credentials:

- email `jody@test.com`
- password: `test1234`

### 5. Start the server

This starts your app in development mode on port 3000, rebuilding assets on file changes.

```sh
npm run dev
```
