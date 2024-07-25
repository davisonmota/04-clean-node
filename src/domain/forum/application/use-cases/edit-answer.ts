import { AnswersRepository } from '../repositories/answers-repository'

type Input = {
  userId: string
  answerId: string
  content: string
}

type Output = {
  answer: {
    id: string
    content: string
    authorId: string
    createdAt: Date
    updatedAt: Date
  }
}

export class EditAnswerUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute({ userId, answerId, content }: Input): Promise<Output> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    if (userId !== answer.getAuthorId()) {
      throw new Error('Not allowed.')
    }

    answer.setContent(content)

    await this.answersRepository.save(answer)

    return {
      answer: {
        id: answer.getId(),
        authorId: answer.getAuthorId(),
        content: answer.getContent(),
        createdAt: answer.getCreatedAt(),
        updatedAt: answer.getUpdatedAt()!,
      },
    }
  }
}
