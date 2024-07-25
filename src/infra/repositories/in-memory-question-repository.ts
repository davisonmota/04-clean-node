import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  readonly items: Question[] = []

  async create(question: Question): Promise<void> {
    this.items.push(question)
  }

  async find(slug: string): Promise<Question | null> {
    const question = this.items.find((item) => item.getSlug() === slug)

    if (!question) return null

    return question
  }

  async findById(id: string): Promise<Question | null> {
    const question = this.items.find((item) => item.getId() === id)

    if (!question) return null

    return question
  }

  async delete(question: Question): Promise<void> {
    const indexItem = this.items.findIndex(
      (item) => item.getId() === question.getId(),
    )
    this.items.splice(indexItem, 1)
  }
}
