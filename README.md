# Servers benchmarks

The project consists of stress testing various server setups to compare results and determine the most performant backend technology.

### Epic Jira ticket

https://ussdprdengcms03.hologic.corp/browse/GDD-1540

## Runtime Technologies

- [Nodejs](https://nodejs.org/en)
- [Bun](https://bun.sh)
- [Deno](deno.com/)
- [.NET](https://dotnet.microsoft.com/en-us/download)

## Framework Technologies

- [Express](https://expressjs.com)
- [Hono](hono.dev/)
- [Elysia](elysiajs.com/)
- [Endcore](https://encore.dev)
- [Fastify](https://fastify.dev)

## No longer under consideration

~~Deno~~
~~Encore~~

```
Encore has been dropped from the bucket!
Although the framework provides useful tools out of the box, we want to aim for
alternatives that allow us a flexible development experience instead of being subject to a vendor lock-in paradigm.

Though deno has been the topic for conversation in the development center square community for quite some time, the adaptation has been
really slow moving hence lack of support within the community.
```

## Servers

```
[x] bun-elysia
[x] bun-hono
[x] dotnet
[x] node-express
[x] node-fastify

```

## Todo Enpoints Schema

```
- GET    /api/v1/
- GET    /api/v1/:id
- POST   /api/v1
- DELETE /api/v1/:id
- PUT    /api/v1/:id
```

### Load tester applications

#### Top Priority

- [K6](K6.io/)

#### Alternatives

- [Artillery](https://www.artillery.io)
- [Auto Cannon](https://github.com/mcollina/autocannon#readme)

```
DATABASE SETUP
1. Pull the postgresql image from the docker registry
2. Run the image
3. Go into the postgresql container terminal (as an alternative, you can use the docker client)
4. Create database 'dailytasks' and 'tasks' table

    4a. From your host terminal
        1. Docker exec -it <container_name> psql -U postgres -d dailytasks
        2. Copy and paste the 'create database snippet below
    4b. Using docker client
        1. Go into the database container by clicking on the container name
        2. Click on the exec tab
        3. Type 'psql -U postgres -d dailytasks' to access the database 'dailytasks'
        4. Copy and paste the 'create database' snippet below

5. Create database:

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
