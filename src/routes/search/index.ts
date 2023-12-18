import { Context } from "elysia";
import { JSDOM } from "jsdom";
import { renderEjs } from "../../utils/render-ejs";

export const get = {
  handler: async ({ query, set }: Context) => {
    if (!query.q) set.redirect = "/";

    const baseUrl = "https://html.duckduckgo.com/html?q=";
    const res = await fetch(baseUrl + query.q);
    const html = await res.text();

    const dom = new JSDOM(html);
    const document = dom.window.document;

    const results = [];
    const els = document.querySelectorAll(".links_main");

    for (const el of els) {
      const anchor = el.querySelector(".result__a") as HTMLAnchorElement;

      const url = anchor.href.split(
        /\/\/duckduckgo\.com\/l\/\?uddg\=|\?rut/
      )[1];

      const titleEncoded = new dom.window.DOMParser().parseFromString(
        anchor.innerHTML,
        "text/html"
      );

      results.push({
        title: titleEncoded.documentElement.textContent,
        url: decodeURIComponent(url),
        description: document.querySelector(".result__snippet")?.innerHTML,
      });
    }
    return renderEjs("search.ejs", { query: query.q, results });
  },
};
