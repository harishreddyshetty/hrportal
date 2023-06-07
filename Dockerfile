<<<<<<< HEAD
# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
=======
# Base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
>>>>>>> 4585445 (Created LeaveForm component)
COPY package*.json ./

# Install dependencies
RUN npm install

<<<<<<< HEAD
# Copy the entire React application to the working directory
COPY . .

# Build the React application
RUN npm run build

# Expose a port (optional)
EXPOSE 3000

# Define the command to run the application
=======
# Copy app source code
COPY . .

# Build the React app
RUN npm run build

# Expose port (if needed)
EXPOSE 3000

# Start the React app
>>>>>>> 4585445 (Created LeaveForm component)
CMD ["npm", "start"]
