import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import questions from './quiz.json';

export const quizRouter = createTRPCRouter({
  question: publicProcedure
    .input(z.object({ questionNumber: z.number() }))
    .query(({ input }) => {
      return {
        question: questions[input.questionNumber] 
      };
    }),
  questions: publicProcedure
    .query(() => {
      return questions;
    }),
});
