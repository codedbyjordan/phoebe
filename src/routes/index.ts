import { renderEjs } from "../utils/render-ejs";

export const get = {
  handler: () => renderEjs("index.ejs"),
};
