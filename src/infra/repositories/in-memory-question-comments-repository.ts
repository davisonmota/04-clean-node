import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  readonly items: QuestionComment[] = []

  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment)
  }

  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = this.items.find((item) => item.getId() === id)

    if (!questionComment) return null

    return questionComment
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    const indexItem = this.items.findIndex(
      (item) => item.getId() === questionComment.getId(),
    )
    this.items.splice(indexItem, 1)
  }
}
