# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

COPY start_docker.sh /start_docker.sh

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that your Nest.js application will run on (e.g., 3000)
EXPOSE 3000

# Start your Nest.js application
CMD ["/start_docker.sh"]
