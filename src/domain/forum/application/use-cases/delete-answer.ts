import { AnswersRepository } from '../repositories/answers-repository'

type Input = {
  userId: string
  answerId: string
}

export class DeleteAnswerUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute({ answerId, userId }: Input): Promise<void> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    if (userId !== answer.getAuthorId()) {
      throw new Error('Not allowed.')
    }

    await this.answersRepository.delete(answer)
  }
}
