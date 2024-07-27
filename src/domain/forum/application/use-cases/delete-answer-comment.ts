import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

type Input = {
  userId: string
  answerCommentId: string
}

export class DeleteAnswerCommentUseCase {
  constructor(
    private readonly answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute({ userId, answerCommentId }: Input): Promise<void> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)
    if (!answerComment) {
      throw new Error('Answer comment not found.')
    }

    if (answerComment.getAuthorId() !== userId) {
      throw new Error('Not Allowed.')
    }

    await this.answerCommentsRepository.delete(answerComment)
  }
}
