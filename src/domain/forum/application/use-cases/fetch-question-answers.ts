import { AnswersRepository } from '../repositories/answers-repository'

type Input = {
  questionId: string
  page: number
}

type AnswersDTO = {
  authorId: string
  questionId: string
  content: string
  createdAt: Date
  updatedAt?: Date
}

type Output = {
  answers: AnswersDTO[]
}

export class FetQuestionAnswersUseCase {
  constructor(private readonly answerRepository: AnswersRepository) {}

  async execute({ questionId, page }: Input): Promise<Output> {
    const answers = await this.answerRepository.findManyByQuestionId(
      questionId,
      {
        page,
      },
    )

    const answersDTO: AnswersDTO[] = answers.map((answer) => {
      return {
        authorId: answer.getAuthorId(),
        questionId: answer.getQuestionId(),
        content: answer.getContent(),
        createdAt: answer.getCreatedAt(),
        updatedAt: answer.getUpdatedAt(),
      }
    })

    return {
      answers: answersDTO,
    }
  }
}
