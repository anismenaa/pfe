import { Message } from 'node-nats-streaming'
import { Subjects, Listener, BonEntreeDeletedEvent } from '@anismenaapfeesi/common-api'
import { BonEntree } from '../models/bonEntree'

export class BonEntreeDeletedListener extends Listener<BonEntreeDeletedEvent> {
  subject: Subjects.BonEntreeDeleted = Subjects.BonEntreeDeleted
  queueGroupName = 'stock-service'

  async onMessage(data: BonEntreeDeletedEvent['data'], msg: Message) {

    const { id} = data
    
    await BonEntree.deleteOne({_id: id})
      .then(()=> {
        console.log('bon entree deleted successfully in the stock ms')
      })

    msg.ack()
  }
}
