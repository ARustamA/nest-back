# Use the official Node.js 14 image as the base image
FROM node:latest

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application files to the container
COPY . .

# Expose the port that the NestJS application will listen on
EXPOSE 8888

# Start the application
CMD ["yarn", "run", "start", "dev"]
