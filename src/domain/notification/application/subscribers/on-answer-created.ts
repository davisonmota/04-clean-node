import { DomainEvents } from '@/domain/events/domain-events'
import { EventHandler } from '@/domain/events/event-handle'
import { AnswerCreatedEvent } from '@/domain/forum/enterprise/event/answer-created-event'

export class OnAnswerCreated implements EventHandler {
  constructor() {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this),
      AnswerCreatedEvent.name,
    )
  }

  private async sendNewAnswerNotification(event: AnswerCreatedEvent) {
    console.log(event)
  }
}
