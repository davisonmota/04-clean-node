import { NotificationsRepository } from '@/domain/notification/application/repositories/NotificationsRepository'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  readonly items: Notification[] = []

  async create(notification: Notification): Promise<void> {
    this.items.push(notification)
  }
}
