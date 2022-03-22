# Workout-tracker backend

## Run dev env

First run the postgres db and pg admin:

```
docker compose -f docker-compose.dev.yml up -d
```

Install deps:

```
npm install
```

Set env variables (e.g to an .env file):

DATABASE_URL=postgresql://postgres:password@localhost:5432/todo-db

run:

```
npm run dev
```
