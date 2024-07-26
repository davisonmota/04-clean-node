import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswersRepository } from '../repositories/answers-repository'
import { QuestionsRepository } from '../repositories/questions-repository'

type Input = {
  userId: string
  answerId: string
}

type Output = {
  question: {
    id: string
    title: string
    slug: string
    content: string
    authorId: string
    bestAnswerId: string
    createdAt: Date
  }
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private readonly questionsRepository: QuestionsRepository,
    private readonly answersRepository: AnswersRepository,
  ) {}

  async execute({ userId, answerId }: Input): Promise<Output> {
    const answer = await this.answersRepository.findById(answerId)
    if (!answer) {
      throw new Error('Answer not found.')
    }

    const question = await this.questionsRepository.findById(
      answer.getQuestionId(),
    )
    if (!question) {
      throw new Error('Question not found.')
    }

    if (question.getId() !== userId) {
      throw new Error('Not allowed.')
    }

    question.setBestAnswerId(new UniqueEntityID(answer.getId()))

    await this.questionsRepository.save(question)

    return {
      question: {
        id: question.getId(),
        authorId: question.getAuthorId(),
        title: question.getTitle(),
        content: question.getContent(),
        slug: question.getSlug(),
        bestAnswerId: question.getBestAnswerId()!,
        createdAt: question.getCreatedAt(),
      },
    }
  }
}
