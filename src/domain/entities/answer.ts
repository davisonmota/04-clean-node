import { randomUUID } from "crypto";

type CreateAnswer = {
  authorId: string
  questionId: string
  content: string
  id?: string
}

export class Answer {
  private id: string
  private content: string
  private authorId: string
  private questionId: string

  constructor({ id = randomUUID(), authorId, questionId, content }: CreateAnswer) {
    this.authorId = authorId
    this.questionId = questionId
    this.content = content
    this.id = id
  }

  getId(): string {
    return this.id
  }

  getContent(): string {
    return this.content
  }

  getAuthorId(): string {
    return this.authorId
  }

  getQuestionId(): string {
    return this.questionId
  }
}