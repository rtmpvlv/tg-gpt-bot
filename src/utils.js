import { unlink } from "fs/promises";
import { DefaultEntity } from "./entities/DefaultEntity.js";
import { FortuneTellerEntity } from "./entities/FortuneTellerEntity.js";

export const LOADING_MESSAGE = "Загружаю ответ...";
export const VOICE_MESSAGE_ERROR = "Пожалуйста, отправьте текстовое сообщение.";
export const INITIAL_SESSION = { messages: [] };
export const INITIAL_MESSAGES = {
  6101735471: "Введите дату рождения.",
  6010220399: "Введите имя и фамилию человека."
};

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
  const botId = ctx?.botInfo?.id?.toString();

  ctx.session = INITIAL_SESSION;
  await ctx.reply(INITIAL_MESSAGES[botId]);
}
