import { Either, left, right } from '@/core/either'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

type Input = {
  userId: string
  answerCommentId: string
}

type OutPut = Either<string, {}>

export class DeleteAnswerCommentUseCase {
  constructor(
    private readonly answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute({ userId, answerCommentId }: Input): Promise<OutPut> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)
    if (!answerComment) {
      return left('Answer comment not found.')
    }

    if (answerComment.getAuthorId() !== userId) {
      return left('Not Allowed.')
    }

    await this.answerCommentsRepository.delete(answerComment)
    return right({})
  }
}
