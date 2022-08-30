import { Message } from 'node-nats-streaming'
import { Subjects, Listener, ItemBsCreatedEvent } from '@anismenaapfeesi/common-api'
import { ItemBs } from '../model/itemSortie'
import { ItemAchat } from '../model/itemAchat'

export class ItemBsCreatedListener extends Listener<ItemBsCreatedEvent> {
  subject: Subjects.ItemBsCreated = Subjects.ItemBsCreated
  queueGroupName = 'document-service'

  async onMessage(data: ItemBsCreatedEvent['data'], msg: Message) {
    const {id, bonSortie, quantity, itemId} = data
    
    // check if the item is here
    const itemExist = await ItemBs.findOne({itemId:itemId})
    if(itemExist){
      await itemExist.delete()
    }
    const item = ItemBs.build({
      id,
      bonSortieId: bonSortie,
      quantity,
      itemId,
    })  

    await item.save()

    // and then update the ItemAchat
    
   /*  const itemAchat = await ItemAchat.findById(itemId)
    if (itemAchat) {
      const newQuantity = itemAchat!.quantity - quantity
      await itemAchat?.updateOne({
        quantity: newQuantity
      })
    } 
 */

    msg.ack()
  }
}
