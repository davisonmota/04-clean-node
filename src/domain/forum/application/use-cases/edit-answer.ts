import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '../errors/not-allowed-error '
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { AnswersRepository } from '../repositories/answers-repository'

type Input = {
  userId: string
  answerId: string
  content: string
}

type Output = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: {
      id: string
      content: string
      authorId: string
      createdAt: Date
      updatedAt: Date
    }
  }
>

export class EditAnswerUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute({ userId, answerId, content }: Input): Promise<Output> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (userId !== answer.getAuthorId()) {
      return left(new NotAllowedError())
    }

    answer.setContent(content)

    await this.answersRepository.save(answer)

    return right({
      answer: {
        id: answer.getId(),
        authorId: answer.getAuthorId(),
        content: answer.getContent(),
        createdAt: answer.getCreatedAt(),
        updatedAt: answer.getUpdatedAt()!,
      },
    })
  }
}
