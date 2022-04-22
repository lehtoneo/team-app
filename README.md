# My team management app

The initial idea was to use python for the backend, but I changed it in to the beginning to node. Hence there is some small amount of hours used to a Python backend, which is now non-existing.

Backend is Graphql API and frontend is a React app (create-react-app)

## Prod build (locally)

### Build image

```
docker build -t team-app-prod . --build-arg GRAPHQL_API_URL=http://localhost:5000/graphql
```

### Run container (locally)

```
docker run -p 127.0.0.1:5000:5000/tcp --env DATABASE_URL=postgresql://postgres:password@<local_machine_ip>:5432/team-db team-prod 
```

## Dev env setup:

``` 
See ./frontend and ./backend README.md:s
```
