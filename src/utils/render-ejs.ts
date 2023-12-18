import { join } from "node:path";
import ejs from "ejs";

export async function renderEjs<TRenderData extends Record<string, unknown>>(
  templateName: string,
  options?: TRenderData
) {
  const templatePath = join(import.meta.dir + "/../views/" + templateName);
  const templateFile = await Bun.file(templatePath);
  const template = await templateFile.text();

  return ejs.render(template, options);
}
