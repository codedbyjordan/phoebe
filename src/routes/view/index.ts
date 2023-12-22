import { Readability } from "@mozilla/readability";
import { t } from "elysia";
import puppeteer from "puppeteer";
import { Route } from "webster-router";
import { JSDOM } from "jsdom";
import { renderEjs } from "../../utils/render-ejs";

export const get: Route = {
  schema: {
    query: t.Object({
      site: t.String({
        pattern: "^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?$",
      }),
    }),
  },
  handler: async ({ query }) => {
    const siteToView = query.site!;

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.goto(siteToView);
    const dom = await page.content();

    const { document } = new JSDOM(dom).window;

    const readable = new Readability(document as any).parse();

    await browser.close();
    return renderEjs("view.ejs", {
      title: readable?.title,
      content: readable?.content,
    });
  },
};
