# Use official Node.js image as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Expose the Fastify port
EXPOSE 3000

# Set environment variables (correct DB host: psql-db)
ENV APP_PORT=3000
ENV PSQL_HOST=psql-db
ENV PSQL_DB=dailytasks
ENV PSQL_USER=postgres
ENV PSQL_PASSWORD=root
ENV PSQL_PORT=5432

# Start the Fastify server
CMD ["npm", "start"]