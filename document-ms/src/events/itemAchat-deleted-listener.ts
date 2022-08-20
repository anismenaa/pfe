import { Message } from 'node-nats-streaming'
import { Subjects, Listener, ItemAchatDeletedEvent } from '@anismenaapfeesi/common-api'
import { ItemAchat } from '../model/itemAchat'

export class ItemAchatDeletedListener extends Listener<ItemAchatDeletedEvent> {
  subject: Subjects.ItemAchatDeleted = Subjects.ItemAchatDeleted
  queueGroupName = 'document-service'

  async onMessage(data: ItemAchatDeletedEvent['data'], msg: Message) {

    const {id} = data
    
  

    await ItemAchat.deleteOne({_id: id})
      .then(()=> {
        console.log('Item deleted successfully in the stock ms')
      })
      .catch(()=> {
        console.log('an error occured when procedding in deleting the item')
      })

    msg.ack()
  }
}
