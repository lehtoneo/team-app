# My todo app

Backend is Python Rest API and frontend is a React app (create-react-app)

## Prod

### Build image

```
docker build -t todo-prod . --build-arg GRAPHQL_API_URL=http://localhost:5000/graphql
```

### Run container (locally)

```
docker run -p 127.0.0.1:5000:5000/tcp --env DATABASE_URL=postgresql://postgres:password@<local_machine_ip>:5432/todo-db todo-prod 
```

## Dev env setup:

``` 
docker compose -f docker-compose.dev.yml up --build
```
