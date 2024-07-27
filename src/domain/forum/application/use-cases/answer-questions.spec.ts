import { InMemoryAnswersRepository } from '@/infra/repositories/in-memory-answers-repository'
import { describe, expect, test } from 'vitest'
import { AnswerQuestionsUseCase } from './answer-questions'

describe('Answer Question Use Case', () => {
  test('deve responder uma dúvida (question)', async () => {
    const inMemoryRepositoryAnswers = new InMemoryAnswersRepository()
    const answerQuestion = new AnswerQuestionsUseCase(inMemoryRepositoryAnswers)

    const outputAnswerQuestion = await answerQuestion.execute({
      instructorId: '1',
      questionId: '1',
      content: 'Nova resposta para a dúvida do aluno',
    })

    expect(outputAnswerQuestion.content).toBe(
      'Nova resposta para a dúvida do aluno',
    )
  })
})
