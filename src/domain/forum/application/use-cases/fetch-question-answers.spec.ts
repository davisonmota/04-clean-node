import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswersRepository } from '@/infra/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { describe, expect, test } from 'vitest'
import { FetQuestionAnswersUseCase } from './fetch-question-answers'

describe('Fetch Question Answers Use Case', () => {
  test('should be able to fetch question answers', async () => {
    const inMemoryAnswersRepository = new InMemoryAnswersRepository()
    const fetQuestionAnswersUseCase = new FetQuestionAnswersUseCase(
      inMemoryAnswersRepository,
    )

    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-id'),
      }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-id'),
      }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-id'),
      }),
    )

    const { answers } = await fetQuestionAnswersUseCase.execute({
      page: 1,
      questionId: 'question-id',
    })

    expect(answers).toEqual([
      expect.objectContaining({
        questionId: 'question-id',
      }),
      expect.objectContaining({
        questionId: 'question-id',
      }),
      expect.objectContaining({
        questionId: 'question-id',
      }),
    ])
    expect(answers).toHaveLength(3)
  })

  test('should be able to fetch paginated question answers', async () => {
    const inMemoryAnswersRepository = new InMemoryAnswersRepository()
    const fetQuestionAnswersUseCase = new FetQuestionAnswersUseCase(
      inMemoryAnswersRepository,
    )

    for (let i = 1; i <= 25; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityID('question-id'),
        }),
      )
    }

    const { answers } = await fetQuestionAnswersUseCase.execute({
      page: 2,
      questionId: 'question-id',
    })
    expect(answers).toHaveLength(5)
  })
})
