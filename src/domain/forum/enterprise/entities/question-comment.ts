import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface QuestionCommentProps {
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class QuestionComment extends Entity<QuestionCommentProps> {
  static create(
    props: Optional<QuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): QuestionComment {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return questionComment
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

  getQuestionId(): string {
    return this.props.questionId.getValue()
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
