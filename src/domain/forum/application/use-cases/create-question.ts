import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

type Input = {
  authorId: string
  title: string
  content: string
}

type Output = {
  question: {
    id: string
    title: string
    slug: string
    content: string
    authorId: string
    createdAt: Date
  }
}

export class CreateQuestionUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute({ authorId, title, content }: Input): Promise<Output> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    })

    await this.questionsRepository.create(question)

    return {
      question: {
        id: question.getId(),
        authorId: question.getAuthorId().getValue(),
        title: question.getTitle(),
        content: question.getContent(),
        slug: question.getSlug(),
        createdAt: question.getCreatedAt(),
      },
    }
  }
}
