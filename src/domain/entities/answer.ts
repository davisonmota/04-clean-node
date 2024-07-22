import { Entity } from "../../core/entities/entity";

interface AnswerProps {
  authorId: string
  questionId: string
  content: string
}

export class Answer extends Entity<AnswerProps> {

  getContent(): string {
    return this.props.content
  }

  getAuthorId(): string {
    return this.props.authorId
  }

  getQuestionId(): string {
    return this.props.questionId
  }
}