import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '../errors/not-allowed-error '
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

type Input = {
  userId: string
  questionCommentId: string
}

type Output = Either<ResourceNotFoundError | NotAllowedError, {}>

export class DeleteQuestionCommentUseCase {
  constructor(
    private readonly questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute({ userId, questionCommentId }: Input): Promise<Output> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId)
    if (!questionComment) {
      return left(new ResourceNotFoundError())
    }

    if (questionComment.getAuthorId() !== userId) {
      return left(new NotAllowedError())
    }

    await this.questionCommentsRepository.delete(questionComment)
    return right({})
  }
}
