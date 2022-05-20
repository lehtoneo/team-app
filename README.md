# Team app

## About the application

App can be fround from this address: https://lehtoneo-team-app.herokuapp.com/

The application is a simple team management app, targeted mainly to sport teams. Users can create teams to the application and invite other users to them. Events for teams can be created and users can mark whether they attend them or not. It is much like the Finnish application called "Nimenhuuto". 

### Techs

The initial idea was to use python for the backend, but I changed it in to the beginning to node.

Backend is Graphql API created with TypeGraphql and TypeOrm. Frontend is a React app (create-react-app). The app is deployed as a containerized fullstack app to Heroku.

## Usage instructions

Can be found from [here](./docs/usage_instructions.md)

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
