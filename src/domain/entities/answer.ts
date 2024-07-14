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
  public authorId: string
  public questionId: string

  constructor({ authorId, questionId, content, id }: CreateAnswer) {
    this.authorId = authorId
    this.questionId = questionId
    this.content = content
    this.id = id ?? randomUUID()
  }

  getId(): string {
    return this.id
  }

  getContent(): string {
    return this.content
  }
}