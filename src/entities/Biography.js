import { DefaultEntity } from "./DefaultEntity.js";
import { openai } from "../openai.js";

export class FortuneTellerEntity extends DefaultEntity {
  addSystemMessage(ctx) {
    ctx.session.messages.push({
      role: openai.roles.SYSTEM,
      content:
        "Write a short biography of the person. Answer must be on Russian language.",
    });
  }
}
