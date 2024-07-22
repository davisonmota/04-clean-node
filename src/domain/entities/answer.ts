import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/types/optional";

interface AnswerProps {
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {

  static create(props: Optional<AnswerProps, 'createdAt'>, id?: UniqueEntityID): Answer {
    const answer = new Answer({
      ...props,
      createdAt: new Date
    }, id)
    return answer
  }

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