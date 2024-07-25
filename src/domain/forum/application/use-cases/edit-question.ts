import { QuestionsRepository } from '../repositories/questions-repository'

type Input = {
  userId: string
  questionId: string
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

export class EditQuestionBySlugUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute({
    userId,
    questionId,
    title,
    content,
  }: Input): Promise<Output> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    if (userId !== question.getAuthorId()) {
      throw new Error('Not allowed.')
    }

    question.setTitle(title)
    question.setContent(content)

    await this.questionsRepository.save(question)

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
