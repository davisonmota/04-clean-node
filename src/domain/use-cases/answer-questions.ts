import { Answer } from "../entities/answer"
import { AnswersRepository } from "../repositories/answers-repository"

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
  constructor (private readonly answersRepository: AnswersRepository){}

  async execute({instructorId, questionId,content}: Input): Promise<Output> {
    const answer = new Answer({authorId: instructorId, questionId, content})

    await this.answersRepository.create(answer)

    return {
      id: answer.getId(),
      content: answer.getContent()
    }
  }
}