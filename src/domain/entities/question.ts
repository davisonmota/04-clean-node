import { randomUUID } from "crypto";

export  class Question {
  public id: string
  public title: string
  public content: string
  public authorId: string


  constructor(authorId: string, title: string, content: string, id?: string) {
    this.authorId= authorId
    this.title= title
    this.content=content
    this.id = id ?? randomUUID()
  }
}