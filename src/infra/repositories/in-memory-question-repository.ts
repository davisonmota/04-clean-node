import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  private readonly items: Question[] = []

  async create(question: Question): Promise<void> {
    this.items.push(question)
  }

  async find(slug: string): Promise<Question | null> {
    const question = this.items.find((item) => item.getSlug() === slug)

    if (!question) return null

    return question
  }
}
