import { Entity } from "../../core/entities/entity";
import { Slug } from "./Slug";

interface QuestionProps {
  title: string
  slug: Slug
  content: string
  authorId: string
} 

export  class Question extends Entity<QuestionProps>{

}