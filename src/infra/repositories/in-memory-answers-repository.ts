import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  readonly items: Answer[] = []

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }

  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.getId() === id)

    if (!answer) return null

    return answer
  }

  async delete(answer: Answer): Promise<void> {
    const indexItem = this.items.findIndex(
      (item) => item.getId() === answer.getId(),
    )
    this.items.splice(indexItem, 1)
  }
}
