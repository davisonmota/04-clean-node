import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswersRepository } from '@/infra/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { describe, expect, test, vi } from 'vitest'
import { NotAllowedError } from '../errors/not-allowed-error '
import { EditAnswerUseCase } from './edit-answer'

describe('Edit Answer Use Case', () => {
  test('deve editar uma resposta (answer)', async () => {
    const inMemoryAnswersRepository = new InMemoryAnswersRepository()
    const editAnswer = new EditAnswerUseCase(inMemoryAnswersRepository)

    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('user-id'),
      },
      new UniqueEntityID('id-answer'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    vi.setSystemTime(new Date('2024-07-01T00:00:00'))
    await editAnswer.execute({
      userId: 'user-id',
      answerId: 'id-answer',
      content: 'New content edited',
    })

    const answerEdited = await inMemoryAnswersRepository.findById('id-answer')

    expect(answerEdited?.getContent()).toBe('New content edited')
    expect(answerEdited?.getUpdatedAt()).toEqual(
      new Date('2024-07-01T00:00:00'),
    )
    expect(answerEdited?.getAuthorId()).toBe('user-id')
    expect(answerEdited?.getId()).toBe('id-answer')
  })

  test('Não deve editar uma resposta (answer) se não for o autor', async () => {
    const inMemoryAnswersRepository = new InMemoryAnswersRepository()
    const editAnswer = new EditAnswerUseCase(inMemoryAnswersRepository)

    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('user-id'),
      },
      new UniqueEntityID('id-answer'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    const result = await editAnswer.execute({
      userId: 'any-user-id',
      answerId: 'id-answer',
      content: 'New content edited',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
