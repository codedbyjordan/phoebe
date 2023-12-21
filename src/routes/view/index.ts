import { Route } from "webster-router";

export const get: Route = {
  handler: async ({ query, set }) => {
    if (!query.site) set.redirect = "/";

    const siteToView = query.site!;
    // use puppeteer or similar library to get the html of the site
    // because if we just use fetch, then SPAs won't work
  },
};
