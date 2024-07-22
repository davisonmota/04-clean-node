import { UniqueEntityID } from "@/core/entities/unique-entity-id"
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
    const answer = Answer.create({
      authorId: new UniqueEntityID(instructorId),
      questionId: new  UniqueEntityID(questionId),
      content
    })

    await this.answersRepository.create(answer)

    return {
      id: answer.getId(),
      content: answer.getContent()
    }
  }
}