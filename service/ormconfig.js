module.exports = {
  "type": "mongodb",
  "url": process.env.DATABASE_URL,
  "useUnifiedTopology": true,
  "entities": [
    "./src/models/*{.ts,.js}"
  ],
  "migrations": [
    "./src/migrations/*{.ts,.js}"
  ],
  "cli": {
    "migrationsDir": "./src/migrations"
  }
}