import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

type Input = {
  userId: string
  questionCommentId: string
}

export class DeleteQuestionCommentUseCase {
  constructor(
    private readonly questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute({ userId, questionCommentId }: Input): Promise<void> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId)
    if (!questionComment) {
      throw new Error('Question comment not found.')
    }

    if (questionComment.getAuthorId() !== userId) {
      throw new Error('Not Allowed.')
    }

    await this.questionCommentsRepository.delete(questionComment)
  }
}
