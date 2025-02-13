# Use official Node.js image as base
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first (to leverage Docker caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Expose the port the app runs on
EXPOSE 6582

# Set environment variables (can be overridden by docker-compose.yml)
ENV PORT=6582
ENV PSQL_HOST=psql-database
ENV PSQL_DB=dailytasks
ENV PSQL_USER=postgres
ENV PSQL_PASSWORD=root
ENV PSQL_PORT=5432

# Start the application
CMD ["npm", "start"]
