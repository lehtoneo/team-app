# Backend for todo app

## Build dev

``` 
docker build -f dev.Dockerfile -t todo-app-backend-dev .
```

## Install deps

Be in a venv:

```
cd venv/Scripts && . activate && cd ../..
``` 

Install the dep:

```
pip install <dep>
``` 

Freeze:

```
pip freeze > requirements.txt
``` 