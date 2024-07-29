import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerAttachmentsRepository } from '@/infra/repositories/in-memory-answer-attachments-repository'
import { InMemoryAnswersRepository } from '@/infra/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { makeAnswerAttachment } from 'test/factories/make-answer-attachment'
import { describe, expect, test, vi } from 'vitest'
import { NotAllowedError } from '../errors/not-allowed-error '
import { EditAnswerUseCase } from './edit-answer'

describe('Edit Answer Use Case', () => {
  test('deve editar uma resposta (answer)', async () => {
    const inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    const inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    const editAnswer = new EditAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerAttachmentsRepository,
    )

    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('user-id'),
      },
      new UniqueEntityID('id-answer'),
    )

    await inMemoryAnswersRepository.create(newAnswer)
    inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: new UniqueEntityID(newAnswer.getId()),
        attachmentId: new UniqueEntityID('1'),
      }),
    )

    inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: new UniqueEntityID(newAnswer.getId()),
        attachmentId: new UniqueEntityID('2'),
      }),
    )

    vi.setSystemTime(new Date('2024-07-01T00:00:00'))
    await editAnswer.execute({
      userId: 'user-id',
      answerId: 'id-answer',
      content: 'New content edited',
      attachmentsIds: ['1', '3'],
    })

    const answerEdited = await inMemoryAnswersRepository.findById('id-answer')

    expect(answerEdited?.getContent()).toBe('New content edited')
    expect(answerEdited?.getUpdatedAt()).toEqual(
      new Date('2024-07-01T00:00:00'),
    )
    expect(answerEdited?.getAuthorId()).toBe('user-id')
    expect(answerEdited?.getId()).toBe('id-answer')

    expect(
      inMemoryAnswersRepository.items[0]
        .getAttachments()
        .getItems()[0]
        .getAttachmentId(),
    ).toBe('1')
    expect(
      inMemoryAnswersRepository.items[0]
        .getAttachments()
        .getItems()[1]
        .getAttachmentId(),
    ).toBe('3')
  })

  test('Não deve editar uma resposta (answer) se não for o autor', async () => {
    const inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()

    const inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    const editAnswer = new EditAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerAttachmentsRepository,
    )
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
      attachmentsIds: [],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
