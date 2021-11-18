# library-management

## How to run

Note: You need to have docker-compose installed in your machine.
```
docker-compose build --no-cache
docker-compose up -d
```

Finally you can access `http://localhost:8080` to access the page

### Running locally

To run locally, you will need to have a running instance of MySQL.

You need to change the connection settings in  `application.properties` file.

## Endpoints
The definitions of endpoints can be checked on [swagger](http://localhost:8080/swagger-ui/index.html) when the it's running.