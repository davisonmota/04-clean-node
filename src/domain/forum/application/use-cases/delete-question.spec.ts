import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionsRepository } from '@/infra/repositories/in-memory-question-repository'
import { makeQuestion } from 'test/factories/make-question'
import { describe, expect, test } from 'vitest'
import { DeleteQuestionUseCase } from './delete-question'

describe('Delete Question Use Case', () => {
  test('deve deletar uma dúvida (question) pelo id', async () => {
    const inMemoryRepositoryQuestions = new InMemoryQuestionsRepository()
    const deleteQuestion = new DeleteQuestionUseCase(
      inMemoryRepositoryQuestions,
    )

    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('user-id'),
      },
      new UniqueEntityID('id-question'),
    )

    await inMemoryRepositoryQuestions.create(newQuestion)

    await deleteQuestion.execute({
      userId: 'user-id',
      questionId: 'id-question',
    })

    expect(inMemoryRepositoryQuestions.items).toHaveLength(0)
  })

  test('Não deve deletar uma dúvida (question) se não for o autor', async () => {
    const inMemoryRepositoryQuestions = new InMemoryQuestionsRepository()
    const deleteQuestion = new DeleteQuestionUseCase(
      inMemoryRepositoryQuestions,
    )

    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-id'),
      },
      new UniqueEntityID('id-question'),
    )

    await inMemoryRepositoryQuestions.create(newQuestion)

    const promises = deleteQuestion.execute({
      userId: 'any-user-id',
      questionId: 'id-question',
    })

    expect(promises).rejects.toBeInstanceOf(Error)
  })
})
