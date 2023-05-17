import dotenv from "dotenv";
import { Telegraf, session } from "telegraf";
import { message } from "telegraf/filters";
import { DefaultEntity } from "./entities/DefaultEntity.js";
import {
  BOTS,
  INITIAL_SESSION,
  LOADING_MESSAGE,
  VOICE_MESSAGE_ERROR,
  initCommand,
} from "./utils.js";

dotenv.config();

const fortuneTellerToken = process.env.FORTUNE_TELLER_TOKEN;
const biographyToken = process.env.BIOGRAPHY_TOKEN;
const trainEnglishToken = process.env.TRAIN_ENGLISH_TOKEN;

const defaultEntity = new DefaultEntity();

const botSettings = [
  { token: fortuneTellerToken }, 
  { token: biographyToken },
  { token: trainEnglishToken },
];

function createBot({ token }) {
  const bot = new Telegraf(token);
  bot.use(session());
  bot.command("new", initCommand);
  bot.command("start", initCommand);
  bot.on(message("voice"), async (ctx) => {
    await ctx.reply(VOICE_MESSAGE_ERROR);
  });
  bot.on(message("text"), async (ctx) => {
    ctx.session ??= INITIAL_SESSION;
    const botId = ctx?.botInfo?.id?.toString();

    const entity = BOTS[botId]?.entity || defaultEntity;

    try {
      await ctx.reply(LOADING_MESSAGE);
      await entity.processTextToChat(ctx, ctx.message.text);
    } catch (e) {
      console.log(`Error while text message`, e.message);
    }
  });
  bot.launch();
  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
}

Promise.all(botSettings.map(createBot));
