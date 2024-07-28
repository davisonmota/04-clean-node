import { InMemoryQuestionsRepository } from '@/infra/repositories/in-memory-question-repository'
import { describe, expect, test } from 'vitest'
import { CreateQuestionUseCase } from './create-question'

describe('Create Question Use Case', () => {
  test('deve responder uma dúvida (question)', async () => {
    const inMemoryRepositoryQuestions = new InMemoryQuestionsRepository()
    const answerQuestion = new CreateQuestionUseCase(
      inMemoryRepositoryQuestions,
    )

    const { value } = await answerQuestion.execute({
      authorId: '1',
      title: 'Nova dúvida (question)',
      content: 'Criando uma nova dúvida (question)',
    })

    expect(value?.question.id).toBeTruthy()
    expect(value?.question.title).toBe('Nova dúvida (question)')
    expect(value?.question.content).toBe('Criando uma nova dúvida (question)')
    expect(value?.question.slug).toBe('nova-du-vida-question')
    expect(value?.question.createdAt).instanceOf(Date)
  })
})
