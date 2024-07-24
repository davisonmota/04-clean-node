import { Question } from '../../enterprise/entities/question'

export interface QuestionsRepository {
  create(question: Question): Promise<void>
  find(slug: string): Promise<Question | null>
}
