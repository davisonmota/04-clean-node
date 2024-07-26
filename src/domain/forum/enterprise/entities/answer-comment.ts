import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface AnswerCommentProps {
  authorId: UniqueEntityID
  answerId: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class AnswerComment extends Entity<AnswerCommentProps> {
  static create(
    props: Optional<AnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): AnswerComment {
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return answerComment
  }

  getContent(): string {
    return this.props.content
  }

  setContent(content: string): void {
    this.props.content = content
    this.touch()
  }

  private touch(): void {
    this.props.updatedAt = new Date()
  }

  getAnswerId(): string {
    return this.props.answerId.getValue()
  }

  getAuthorId(): string {
    return this.props.authorId.getValue()
  }

  getCreatedAt(): Date {
    return this.props.createdAt
  }

  getUpdatedAt(): Date | undefined {
    return this.props.updatedAt
  }
}
