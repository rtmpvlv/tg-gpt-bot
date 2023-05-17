import { DefaultEntity } from "./DefaultEntity.js";
import { openai } from "../openai.js";

export class TrainEnglishEntity extends DefaultEntity {
  addSystemMessage(ctx) {
    ctx.session.messages.push({
      role: openai.roles.SYSTEM,
      content:
        "Let's play a game. Imagine that you are an English teacher and I am a Russian student. You generate a sentence in Russian, I translate it in English and write back to you. Then you appreciate my answer and explain why it is right or wrong. Also evaluate the answer on a ten-point scale. Adapt also to the level of the language. While answering, immediately give the following sentence.",
    });
  }
}
