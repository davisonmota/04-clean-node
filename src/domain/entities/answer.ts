import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";

interface AnswerProps {
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {

  getContent(): string {
    return this.props.content
  }

  getAuthorId(): string {
    return this.props.authorId.getValue()
  }

  getQuestionId(): string {
    return this.props.questionId.getValue()
  }
}