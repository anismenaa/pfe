import { Message } from 'node-nats-streaming'
import { Subjects, Listener, ItemDeletedEvent, BRError } from '@anismenaapfeesi/common-api'
import { Item } from '../model/item'

export class ItemDeletedListener extends Listener<ItemDeletedEvent> {
  subject: Subjects.ItemDeleted = Subjects.ItemDeleted
  queueGroupName = 'document-service'

  async onMessage(data: ItemDeletedEvent['data'], msg: Message) {
    const {id} = data
    
    const item = await Item.findById({_id:id})

    if (!item) {
      throw new BRError("item does not exist ")
    }

    await Item.deleteOne({id})
      .then(() => {
        console.log('item deleted in the validation-ms')
      })
      .catch((err) => {
        console.log(err)
      })

    msg.ack()
  }
}
