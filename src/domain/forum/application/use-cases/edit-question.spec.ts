import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionsRepository } from '@/infra/repositories/in-memory-question-repository'
import { makeQuestion } from 'test/factories/make-question'
import { describe, expect, test } from 'vitest'
import { NotAllowedError } from '../errors/not-allowed-error '
import { EditQuestionUseCase } from './edit-question'

describe('Edit Question Use Case', () => {
  test('deve editar uma dúvida (question)', async () => {
    const inMemoryRepositoryQuestions = new InMemoryQuestionsRepository()
    const editQuestion = new EditQuestionUseCase(inMemoryRepositoryQuestions)

    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('user-id'),
      },
      new UniqueEntityID('id-question'),
    )

    await inMemoryRepositoryQuestions.create(newQuestion)

    await editQuestion.execute({
      userId: 'user-id',
      questionId: 'id-question',
      title: 'New title edited',
      content: 'New content edited',
    })

    const questionEdited =
      await inMemoryRepositoryQuestions.findById('id-question')

    expect(questionEdited?.getTitle()).toBe('New title edited')
    expect(questionEdited?.getContent()).toBe('New content edited')
    expect(questionEdited?.getAuthorId()).toBe('user-id')
    expect(questionEdited?.getId()).toBe('id-question')
  })

  test('Não deve editar uma dúvida (question) se não for o autor', async () => {
    const inMemoryRepositoryQuestions = new InMemoryQuestionsRepository()
    const deleteQuestion = new EditQuestionUseCase(inMemoryRepositoryQuestions)

    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-id'),
      },
      new UniqueEntityID('id-question'),
    )

    await inMemoryRepositoryQuestions.create(newQuestion)

    const result = await deleteQuestion.execute({
      userId: 'any-user-id',
      questionId: 'id-question',
      title: 'New title edited',
      content: 'New content edited',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
