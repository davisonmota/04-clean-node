import { describe, expect, test } from 'vitest'
import { AnswersRepository } from '../repositories/answers-repository'
import { AnswerQuestionsUseCase } from './answer-questions'

const fakeAnswersRepository: AnswersRepository = {
  async create(answer) {
    return
  },
}

describe('Answer Question Use Case', ()=>{
  test('deve responder uma dúvida (question)', async () => {
    const answerQuestion = new AnswerQuestionsUseCase(fakeAnswersRepository)

    const outputAnswerQuestion = await answerQuestion.execute({
      instructorId: '1',
      questionId: '1',
      content: 'Nova resposta para a dúvida do aluno'
    })

    expect(outputAnswerQuestion.content).toBe('Nova resposta para a dúvida do aluno')
  })
})