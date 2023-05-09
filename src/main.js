import { Telegraf, session } from "telegraf";
import { message } from "telegraf/filters";
import config from "config";
import { DefaultEntity } from "./entities/DefaultEntity.js";
import {
  BOTS,
  INITIAL_SESSION,
  initCommand,
  LOADING_MESSAGE,
} from "./utils.js";

const bot = new Telegraf(config.get("TELEGRAM_TOKEN"));

bot.use(session());

bot.command("new", initCommand);

bot.command("start", initCommand);

bot.on(message("text"), async (ctx) => {
  ctx.session ??= INITIAL_SESSION;
  const botId = ctx?.botInfo?.id?.toString();

  const entity = BOTS[botId] || new DefaultEntity();

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
