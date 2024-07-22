import dayjs from "dayjs";
import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/types/optional";
import { Slug } from "./Slug";

interface QuestionProps {
  title: string
  slug: Slug
  content: string
  authorId: UniqueEntityID
  bestAnswerId?: UniqueEntityID
  createdAt: Date
  updatedAt?: Date
} 

export  class Question extends Entity<QuestionProps>{
  static create(props: Optional<QuestionProps, 'createdAt' | 'slug'>, id?: UniqueEntityID): Question {
    const question = new Question({
      ...props,
      slug: props.slug ?? Slug.createFromText(props.title),
      createdAt: new Date
    }, id)
    return question
  }
     
  getTitle(): string {
    return this.props.title
  }
  
  setTitle(title: string): void {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  getSlug(): string {
    return this.props.slug.getValue()
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

  getExcept(): string {
    return this.getContent().substring(0, 120).trimEnd().concat('...')
  }

  getBestAnswerId(): UniqueEntityID | undefined {
    return this.props.bestAnswerId
  }

  setBestAnswerId(bestAnswerId: UniqueEntityID): void {
    this.props.bestAnswerId = bestAnswerId
    this.touch()
  }

  getAuthorId(): UniqueEntityID {
    return this.props.authorId
  }

  getCreatedAt(): Date {
    return this.props.createdAt
  }
  
  getUpdatedAt(): Date | undefined {
    return this.props.updatedAt
  }

  isNew(): boolean {
    return dayjs().diff(this.getCreatedAt(), 'days') <= 3
  }
}
