import { randomUUID } from "crypto";
import { Slug } from "./Slug";

type CreateQuestion = {
  id: string
  title: string
  slug: Slug
  content: string
  authorId: string
} 

export  class Question {
  public id?: string
  public title: string
  public slug: Slug
  public content: string
  public authorId: string


  constructor({id = randomUUID(), authorId, title, content, slug}: CreateQuestion) {
    this.authorId= authorId
    this.title= title
    this.slug = slug
    this.content = content
    this.id = id 
  }
}