import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
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

}