import { Message } from 'node-nats-streaming'
import { Subjects, Listener, BonEntreeValidatedEvent, BRError } from '@anismenaapfeesi/common-api'
import { BonEntree } from '../models/bonEntree'

export class BonEntreeValidatedListener extends Listener<BonEntreeValidatedEvent> {
  subject: Subjects.BonEntreeValidated = Subjects.BonEntreeValidated
  queueGroupName = 'stock-service'

  async onMessage(data: BonEntreeValidatedEvent['data'], msg: Message) {

    const { id} = data
    
    const bonEntree = await BonEntree.findById(id)
    
    if (!bonEntree) {
      throw new BRError('bon entree specifié n exsite pas')
    }

    await bonEntree.updateOne({
      validate_BE: true
    })
      .then(()=> {
        console.log('bon entree validated successfully in the stock ms')
      })
      .catch(() => {
        throw new BRError('an error occured while listening to the validation of the bon entree')
      })
    msg.ack()
  }
}
