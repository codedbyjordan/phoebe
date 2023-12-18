import { Elysia } from "elysia";
import staticPlugin from "@elysiajs/static";
import { html } from "@elysiajs/html";
import { webster } from "webster-router";

const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .use(webster())
  .listen(3000);

export type ElysiaApp = typeof app;
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
