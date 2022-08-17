import { Message } from 'node-nats-streaming'
import { Subjects, Listener, ItemCreatedEvent } from '@anismenaapfeesi/common-api'
import { Item } from '../model/item'

export class ItemCreatedListener extends Listener<ItemCreatedEvent> {
  subject: Subjects.ItemCreated = Subjects.ItemCreated
  queueGroupName = 'validation-service'

  async onMessage(data: ItemCreatedEvent['data'], msg: Message) {
    const {id, demandeId, name, quantity, stock_exist, quantity_exist} = data
    
    const item = Item.build({
      id,
      demandeId,
      name, 
      quantity,
      stock_exist,
      quantity_exist
    })

    await item.save()

    msg.ack()
  }
}
