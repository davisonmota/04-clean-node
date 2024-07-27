import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { AnswersRepository } from '../repositories/answers-repository'

type Input = {
  authorId: string
  answerId: string
  content: string
}

type Output = {
  answerComment: {
    id: string
    authorId: string
    answerId: string
    content: string
    createdAt: Date
    updatedAt?: Date
  }
}

export class CommentOnAnswerUseCase {
  constructor(
    private readonly answersRepository: AnswersRepository,
    private readonly answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute({ authorId, answerId, content }: Input): Promise<Output> {
    const answer = await this.answersRepository.findById(answerId)
    if (!answer) {
      throw new Error('Answer not found.')
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    })

    await this.answerCommentsRepository.create(answerComment)

    return {
      answerComment: {
        id: answerComment.getId(),
        answerId: answerComment.getAnswerId(),
        authorId: answerComment.getAuthorId(),
        content: answerComment.getContent(),
        createdAt: answerComment.getCreatedAt(),
        updatedAt: answerComment?.getUpdatedAt(),
      },
    }
  }
}
