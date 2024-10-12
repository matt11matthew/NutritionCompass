#!/bin/bash

# Ensure the script stops on error
set -e

# Open the firewall port for MongoDB


# Variables
IMAGE_NAME="my-mongo"
CONTAINER_NAME="mongodb"
DOCKERFILE_NAME="db.Dockerfile"
PORT="27017"

# Build the Docker image from the specified Dockerfile
echo "Building the Docker image from $DOCKERFILE_NAME..."
docker build -t $IMAGE_NAME -f $DOCKERFILE_NAME .

# Stop and remove any existing MongoDB container
if [ $(docker ps -q -f name=$CONTAINER_NAME) ]; then
  echo "Stopping the existing container..."
  docker stop $CONTAINER_NAME
  docker rm $CONTAINER_NAME
fi

# Run the MongoDB container with the specified port exposed
echo "Running the MongoDB container..."
docker run -d --name $CONTAINER_NAME -p $PORT:27017 $IMAGE_NAME

# Confirm that the container is running
if [ $(docker ps -q -f name=$CONTAINER_NAME) ]; then
  echo "MongoDB container is up and running on port $PORT."
  echo "Use the following command to connect remotely:"
  echo "  mongosh \"mongodb://admin:password@<server-ip>:$PORT\""
else
  echo "Failed to start the MongoDB container."
fi
