import { InMemoryQuestionsRepository } from '@/infra/repositories/in-memory-question-repository'
import { describe, expect, test } from 'vitest'
import { CreateQuestionUseCase } from './create-question'

describe('Create Question Use Case', () => {
  test('deve responder uma dúvida (question)', async () => {
    const inMemoryRepositoryQuestions = new InMemoryQuestionsRepository()
    const answerQuestion = new CreateQuestionUseCase(
      inMemoryRepositoryQuestions,
    )

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
