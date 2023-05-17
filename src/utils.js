import { unlink } from "fs/promises";
import {
  DefaultEntity,
  FortuneTellerEntity,
  BiographyEntity,
  TrainEnglishEntity,
} from "./entities/index.js";

export const LOADING_MESSAGE = "Загружаю ответ...";
export const VOICE_MESSAGE_ERROR = "Пожалуйста, отправьте текстовое сообщение.";
export const INITIAL_SESSION = { messages: [] };

export const BOTS = {
  default: {
    entity: new DefaultEntity(),
    message: "Введите запрос.",
  },
  6101735471: {
    entity: new FortuneTellerEntity(),
    message: "Введите дату рождения.",
  },
  6010220399: {
    entity: new BiographyEntity(),
    message: "Введите имя и фамилию человека.",
  },
  6135415115: {
    entity: new TrainEnglishEntity(),
    message: "Напишите поехали.",
  },
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
  await ctx.reply(BOTS[botId]?.message || BOTS.default.message);
}
