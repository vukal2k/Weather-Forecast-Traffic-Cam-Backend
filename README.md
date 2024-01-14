# Weather Forecast Traffic Cam Backend

## Description
This project, 'weather-forecast-traffic-cam-backend', is a backend service designed to provide weather forecasts and traffic camera information. It's built using the NestJS framework, offering robust API endpoints for clients.

## Installation
To install the project, follow these steps:

```bash
git clone https://github.com/vukal2k/Weather-Forecast-Traffic-Cam-Backend.git
cd weather-forecast-traffic-cam-backend
npm install
```


## Usage
To start the application in development mode:

```bash
npm run start:dev
```

To build the application for production:
```bash
npm run build
npm run start:prod
```

## Docker support
This project includes Docker support. Use the following commands to manage Docker containers:

To start Docker containers:
```bash
npm run docker-start
```
To stop Docker containers:
```bash
npm run docker-stop
```

## Database Migrations
To generate a new migration:
```bash
npm run db-migration-gen
```

To run migrations:
```bash
npm run db-migration-run
```

## Running Tests
To run tests:
```bash
npm run test
```
To run end-to-end tests:
```bash
npm run test:e2e
```

## API Documentation
http://localhost:3000/swagger#/