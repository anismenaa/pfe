import { Message } from 'node-nats-streaming'
import { Subjects, Listener, BonEntreeCreatedEvent } from '@anismenaapfeesi/common-api'
import { BonEntree } from '../models/bonEntree'

export class BonEntreeCreatedListener extends Listener<BonEntreeCreatedEvent> {
  subject: Subjects.BonEntreeCreated = Subjects.BonEntreeCreated
  queueGroupName = 'stock-service'

  async onMessage(data: BonEntreeCreatedEvent['data'], msg: Message) {

    const { id, vendor, validate_BE } = data
    
    const bonEntree = BonEntree.build({
      id,
      vendor,
      validate_BE
    })

    await bonEntree.save()
      .then(()=> {
        console.log('bon entree created successfully in the stock ms')
      })
    msg.ack()
  }
}
