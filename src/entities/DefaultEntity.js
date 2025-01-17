import { openai } from "../openai.js";

const LOADING_ERROR_MESSAGE = "Извините, произошла ошибка. Попробуйте позже.";

export class DefaultEntity {
  addSystemMessage(ctx) {
    return;
  }

  async processTextToChat(ctx, content) {
    try {
      this.addSystemMessage(ctx);

      ctx.session.messages.push({ role: openai.roles.USER, content });
      const response = await openai.chat(ctx.session.messages);

      ctx.session.messages.push({
        role: openai.roles.ASSISTANT,
        content: response.content,
      });

      await ctx.reply(response.content);
    } catch (e) {
      console.log("Error while proccesing text to gpt", e.message);
      await ctx.reply(LOADING_ERROR_MESSAGE);
    }
  }
}
