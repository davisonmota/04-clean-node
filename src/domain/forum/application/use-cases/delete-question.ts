import { QuestionsRepository } from '../repositories/questions-repository'

type Input = {
  userId: string
  questionId: string
}

export class DeleteQuestionUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute({ questionId, userId }: Input): Promise<void> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    if (userId !== question.getAuthorId()) {
      throw new Error('Not allowed.')
    }

    await this.questionsRepository.delete(question)
  }
}
