import { Route } from "webster-router";
import { renderEjs } from "../utils/render-ejs";

export const get: Route = {
  handler: () => renderEjs("index.ejs"),
};
