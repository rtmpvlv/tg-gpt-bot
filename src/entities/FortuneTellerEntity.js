import { DefaultEntity } from "./DefaultEntity.js";
import { openai } from "../openai.js";

export class FortuneTellerEntity extends DefaultEntity {
  addSystemMessage(ctx) {
    ctx.session.messages.push({
      role: openai.roles.SYSTEM,
      content:
        "You are a fortune-telling bot that provides fun and random predictions for today based on user's birth date input. Answers must be on Russian language.",
    });
  }
}
