import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionsRepository } from '@/infra/repositories/in-memory-question-repository'
import { describe, expect, test } from 'vitest'
import { Question } from '../../enterprise/entities/question'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'

describe('Get Question By Slug Use Case', () => {
  test('deve responder uma dúvida (question)', async () => {
    const inMemoryRepositoryQuestions = new InMemoryQuestionsRepository()
    const getQuestionBySlug = new GetQuestionBySlugUseCase(
      inMemoryRepositoryQuestions,
    )

    inMemoryRepositoryQuestions.create(
      Question.create({
        authorId: new UniqueEntityID('1'),
        title: 'Example Question',
        content: 'Content question',
      }),
    )

    const result = await getQuestionBySlug.execute({
      slug: 'example-question',
    })

    expect(result.isRight()).toBe(true)
  })
})
