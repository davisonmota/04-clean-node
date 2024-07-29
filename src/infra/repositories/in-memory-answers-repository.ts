import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  readonly items: Answer[] = []

  constructor(
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }

  async save(answer: Answer): Promise<void> {
    const answerIndex = this.items.findIndex(
      (item) => item.getId() === answer.getId(),
    )

    this.items[answerIndex] = answer
  }

  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.getId() === id)

    if (!answer) return null

    return answer
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<Answer[]> {
    const answers = this.items
      .filter((answer) => answer.getQuestionId() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async delete(answer: Answer): Promise<void> {
    const indexItem = this.items.findIndex(
      (item) => item.getId() === answer.getId(),
    )
    this.items.splice(indexItem, 1)
    await this.answerAttachmentsRepository.deleteManyByAnswerId(answer.getId())
  }
}
