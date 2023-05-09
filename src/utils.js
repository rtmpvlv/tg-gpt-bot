import { unlink } from "fs/promises";
import { DefaultEntity } from "./entities/DefaultEntity.js";
import { FortuneTellerEntity } from "./entities/FortuneTellerEntity.js";

export const LOADING_MESSAGE = "Загружаю ответ...";
export const INITIAL_SESSION = { messages: [] };
export const INITIAL_MESSAGE = "Если хотите начать или продолжить - введите дату рождения.";

export const BOTS = {
  default: new DefaultEntity(),
  6101735471: new FortuneTellerEntity(),
};

export async function removeFile(path) {
  try {
    await unlink(path);
  } catch (e) {
    console.log("Error while removing file", e.message);
  }
}

export async function initCommand(ctx) {
  ctx.session = INITIAL_SESSION;
  await ctx.reply(INITIAL_MESSAGE);
}
