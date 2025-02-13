# Use the official Bun image as the base image
FROM oven/bun:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json first (remove bun.lockb since it might not exist)
COPY package.json ./

# Install dependencies
RUN bun install

# Copy the entire project
COPY . .

# Expose the Bun server port
EXPOSE 1103

# Set environment variables (correct DB host: psql-db)
ENV APP_PORT=1103
ENV PSQL_HOST=psql-db
ENV PSQL_DB=dailytasks
ENV PSQL_USER=postgres
ENV PSQL_PASSWORD=root
ENV PSQL_PORT=5432

# Start the Bun server
CMD ["bun", "run", "src/index.ts"]
