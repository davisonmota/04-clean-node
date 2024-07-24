import { QuestionsRepository } from '../repositories/questions-repository'

type Input = {
  slug: string
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

export class GetQuestionBySlugUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute({ slug }: Input): Promise<Output> {
    const question = await this.questionsRepository.find(slug)

    if (!question) {
      throw new Error('Question not found.')
    }

    return {
      question: {
        id: question.getId(),
        authorId: question.getAuthorId(),
        title: question.getTitle(),
        content: question.getContent(),
        slug: question.getSlug(),
        createdAt: question.getCreatedAt(),
      },
    }
  }
}
