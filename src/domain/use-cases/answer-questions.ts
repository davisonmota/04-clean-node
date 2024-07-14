import { Answer } from "../entities/answer"

type Input = {
  instructorId: string
  questionId: string
  content: string
}

type Output = {
  id: string
  content: string
}

export class AnswerQuestionsUseCase {
  async execute({instructorId, questionId,content}: Input): Promise<Output> {
    const answer = new Answer({authorId: instructorId, questionId, content})

    return {
      id: answer.getId(),
      content: answer.getContent()
    }
  }
}