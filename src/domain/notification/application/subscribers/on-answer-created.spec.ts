import { InMemoryAnswerAttachmentsRepository } from '@/infra/repositories/in-memory-answer-attachments-repository'
import { InMemoryAnswersRepository } from '@/infra/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { describe, it } from 'vitest'
import { OnAnswerCreated } from './on-answer-created'

describe('On Answer Created', () => {
  it('should send a notification when an answer is created', async () => {
    const answerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    const inMemoryAnswersRepository = new InMemoryAnswersRepository(
      answerAttachmentsRepository,
    )
    const onAnswerCreated = new OnAnswerCreated()

    const answer = makeAnswer()

    inMemoryAnswersRepository.create(answer)
  })
})
