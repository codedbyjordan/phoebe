import { Elysia } from "elysia";
import { webster } from "webster-router/dist";
import staticPlugin from "@elysiajs/static";
import { html } from "@elysiajs/html";

const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .use(webster())
  .listen(3000);

export type ElysiaApp = typeof app;
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
