import { describe, expect, test } from 'vitest'
import { QuestionsRepository } from '../repositories/questions-repository'
import { CreateQuestionUseCase } from './create-question'

const fakeAnswersRepository: QuestionsRepository = {
  async create() {},
}

describe('Create Question Use Case', () => {
  test('deve responder uma dúvida (question)', async () => {
    const answerQuestion = new CreateQuestionUseCase(fakeAnswersRepository)

    const { question } = await answerQuestion.execute({
      authorId: '1',
      title: 'Nova dúvida (question)',
      content: 'Criando uma nova dúvida (question)',
    })

    expect(question.id).toBeTruthy()
    expect(question.title).toBe('Nova dúvida (question)')
    expect(question.content).toBe('Criando uma nova dúvida (question)')
    expect(question.slug).toBe('nova-du-vida-question')
    expect(question.createdAt).instanceOf(Date)
  })
})
