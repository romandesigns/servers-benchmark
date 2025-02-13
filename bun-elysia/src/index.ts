import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import pgQueries from './utils/queries';
import db from "./utils/config/database-connection";

const base = "/api/v1";

const app = new Elysia()
    .use(
        swagger({
            exclude: ["/swagger"],
            autoDarkMode: true,
            documentation: {
                info: {
                    title: "🦊 Elysia Clean Architecture",
                    description:
                        "Clean Architecture pattern for ElysiaJS + Bun + Postgres.js by CATFISH",
                    version: "1.0.0",
                    license: {
                        name: "MIT",
                        url: "https://opensource.org/license/mit/",
                    },
                    contact: {
                        name: "Roman Feliz",
                    },
                },
            },
        })
    )
    .get(`${base}/get-tasks`, async () => {
        const tasks = await db.query(pgQueries.getTasks);
        return {
            success: true,
            message: "All Tasks fetched",
            data: tasks.rows,
        };
    })
    .get(`${base}/:id/get-task`, async ({ params: { id } }) => {
        const task = await db.query(pgQueries.getTask, [id]);
        return {
            success: true,
            message: "Task retrieved",
            data: task.rows,
        };
    })
    .post(
        `${base}/create-task`,
        async ({ body }: { body: { title: string; description: string } }) => {
            const task = await db.query(pgQueries.insertTask, [
                body.title,
                body.description,
            ]);
            return {
                success: true,
                message: "Task created",
                data: task.rows,
            };
        }
    )
    .patch(`${base}/:id/update-task`, async ({ params, body }) => {
        const { id } = params;
        const { title, description } = body as {
            title: string;
            description: string;
        };
        const task = await db.query(pgQueries.updateTask, [
            title,
            description,
            id,
        ]);
        return {
            success: true,
            message: "Task updated",
            data: task.rows,
        };
    })
    .delete(`${base}/:id/delete-task`, async ({ params: { id } }) => {
        const task = await db.query(pgQueries.deleteTask, [id]);
        return {
            success: true,
            message: "Task deleted",
            data: task.rows,
        };
    }).listen(Bun.env.APP_PORT!!);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
