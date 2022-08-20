import { Message } from 'node-nats-streaming'
import { Subjects, Listener, ItemBsCreatedEvent } from '@anismenaapfeesi/common-api'
import { ItemBs } from '../model/itemSortie'

export class ItemBsCreatedListener extends Listener<ItemBsCreatedEvent> {
  subject: Subjects.ItemBsCreated = Subjects.ItemBsCreated
  queueGroupName = 'document-service'

  async onMessage(data: ItemBsCreatedEvent['data'], msg: Message) {
    const {id, bonSortie, quantity, itemId} = data
    
    const item = ItemBs.build({
      id,
      bonSortieId: bonSortie,
      quantity,
      itemId,
    })  

    await item.save()

    msg.ack()
  }
}
