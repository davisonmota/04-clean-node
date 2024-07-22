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
  static create(props: Optional<QuestionProps, 'createdAt'>, id?: UniqueEntityID): Question {
    const question = new Question({
      ...props,
      createdAt: new Date
    }, id)
    return question
  }
}
