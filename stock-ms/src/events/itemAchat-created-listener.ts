import { Message } from 'node-nats-streaming'
import { Subjects, Listener, ItemAchatCreatedEvent } from '@anismenaapfeesi/common-api'
import { Item } from '../models/itemAchat'

export class ItemAchatCreatedListener extends Listener<ItemAchatCreatedEvent> {
  subject: Subjects.ItemAchatCreated = Subjects.ItemAchatCreated
  queueGroupName = 'stock-service'

  async onMessage(data: ItemAchatCreatedEvent['data'], msg: Message) {

    const { id, bonEntreeId, name, quantity } = data
    
    const itemAchat = Item.build({
      id,
      bonEntreeId,
      name,
      quantity
    })

    await itemAchat.save()

    msg.ack()
  }
}
