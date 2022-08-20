import { Message } from 'node-nats-streaming'
import { Subjects, Listener, BonSortieDeletedEvent } from '@anismenaapfeesi/common-api'
import { BonSortie } from '../model/bonSortie'

export class BonSortieDeletedListener extends Listener<BonSortieDeletedEvent> {
  subject: Subjects.BonSortieDeleted = Subjects.BonSortieDeleted
  queueGroupName = 'document-service'

  async onMessage(data: BonSortieDeletedEvent['data'], msg: Message) {

    const { id} = data
    
    await BonSortie.deleteOne({_id: id})
      .then(()=> {
        console.log('bon sortie deleted successfully in the document ms')
      })

    msg.ack()
  }
}
