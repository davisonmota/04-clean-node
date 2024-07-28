import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswersRepository } from '@/infra/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { describe, expect, test } from 'vitest'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { DeleteAnswerUseCase } from './delete-answer'

describe('Delete Answer Use Case', () => {
  test('deve deletar uma resposta (answer) pelo id', async () => {
    const inMemoryRepositoryAnswers = new InMemoryAnswersRepository()
    const deleteAnswer = new DeleteAnswerUseCase(inMemoryRepositoryAnswers)

    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('user-id'),
      },
      new UniqueEntityID('id-answer'),
    )

    await inMemoryRepositoryAnswers.create(newAnswer)

    await deleteAnswer.execute({
      userId: 'user-id',
      answerId: 'id-answer',
    })

    expect(inMemoryRepositoryAnswers.items).toHaveLength(0)
  })

  test('Não deve deletar uma dúvida (question) se não for o autor', async () => {
    const inMemoryRepositoryAnswers = new InMemoryAnswersRepository()
    const deleteAnswer = new DeleteAnswerUseCase(inMemoryRepositoryAnswers)

    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-id'),
      },
      new UniqueEntityID('id-answer'),
    )

    await inMemoryRepositoryAnswers.create(newAnswer)

    const result = await deleteAnswer.execute({
      userId: 'any-user-id',
      answerId: 'id-answer',
    })

    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
    expect(result.isLeft()).toBe(true)
  })
})
