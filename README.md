# Adcore Payment System

This repository contains the Docker setup for the Adcore Payment System, including the Payment UI, Payment API, and MongoDB.

## Prerequisites

- Docker [Install Docker](https://docs.docker.com/get-docker/)
- Docker Compose

## Services

The following services are defined in the `docker-compose.yml` file:

- **payment_ui**: The frontend application.
- **payment_api**: The backend API.
- **mongo**: The MongoDB database.

## Getting Started

clone repository:

```sh
git clone https://github.com/idris-adigun/ad-core
```

Change directory to Adcore:

```sh
cd ad-core
```

To start the services, run the following command in the root directory of the project:

```sh
docker-compose up --build
```

This command will build and start all the services defined in the docker-compose.yml file.

## Services Details

# Payment UI

- Build Context: payment_ui
- Dockerfile: Dockerfile
- Container Name: payment_ui
- Ports: 4200:4200

# Payment API

- Build Context: payment_api
- Dockerfile: Dockerfile
- Container Name: payment_api
- Ports: 8000:8000
- Depends On: mongo

# MongoDB

- Image: mongo:6.0
- Container Name: mongo_db
- Ports: 27017:27017
- Volumes: mongo_data:/data/db #Volumes mongo_data: This volume is used to persist MongoDB data.

## Stopping the Services

To stop the services, run the following command:
