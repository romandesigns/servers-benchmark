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
EXPOSE 6485

# Set environment variables (correct DB host: psql-database)
ENV PORT=6485
ENV PSQL_HOST=psql-database
ENV PSQL_DB=dailytasks
ENV PSQL_USER=postgres
ENV PSQL_PASSWORD=root
ENV PSQL_PORT=5432

# Start the Bun server
CMD ["bun", "run", "src/index.ts"]
