import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '../errors/not-allowed-error '
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { QuestionsRepository } from '../repositories/questions-repository'

type Input = {
  userId: string
  questionId: string
  title: string
  content: string
}

type Output = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: {
      id: string
      title: string
      slug: string
      content: string
      authorId: string
      createdAt: Date
      updatedAt: Date
    }
  }
>

export class EditQuestionUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute({
    userId,
    questionId,
    title,
    content,
  }: Input): Promise<Output> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (userId !== question.getAuthorId()) {
      return left(new NotAllowedError())
    }

    question.setTitle(title)
    question.setContent(content)

    await this.questionsRepository.save(question)

    return right({
      question: {
        id: question.getId(),
        authorId: question.getAuthorId(),
        title: question.getTitle(),
        content: question.getContent(),
        slug: question.getSlug(),
        createdAt: question.getCreatedAt(),
        updatedAt: question.getUpdatedAt()!,
      },
    })
  }
}
