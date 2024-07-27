import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '../errors/not-allowed-error '
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

type Input = {
  userId: string
  answerCommentId: string
}

type OutPut = Either<ResourceNotFoundError | NotAllowedError, {}>

export class DeleteAnswerCommentUseCase {
  constructor(
    private readonly answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute({ userId, answerCommentId }: Input): Promise<OutPut> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)
    if (!answerComment) {
      return left(new ResourceNotFoundError())
    }

    if (answerComment.getAuthorId() !== userId) {
      return left(new NotAllowedError())
    }

    await this.answerCommentsRepository.delete(answerComment)
    return right({})
  }
}
