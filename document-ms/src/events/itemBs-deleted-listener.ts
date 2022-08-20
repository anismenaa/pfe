import { Message } from 'node-nats-streaming'
import { Subjects, Listener, ItemBsDeletedEvent } from '@anismenaapfeesi/common-api'
import { ItemBs } from '../model/itemSortie'

export class ItemBsDeletedListener extends Listener<ItemBsDeletedEvent> {
  subject: Subjects.ItemBsDeleted = Subjects.ItemBsDeleted
  queueGroupName = 'document-service'

  async onMessage(data: ItemBsDeletedEvent['data'], msg: Message) {

    const {id} = data
    
  

    await ItemBs.deleteOne({_id: id})
      .then(()=> {
        console.log('Item bs deleted successfully in the document ms')
      })
      .catch(()=> {
        console.log('an error occured when procedding in deleting the item bs')
      })

    msg.ack()
  }
}
