# servers-benchmark

```
CREATE DATABASE dailytasks

#Login into the database dailytasks and create tasks table
docker exect -it <container_name> -U -d dailytasks

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE tasks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    complete BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```
