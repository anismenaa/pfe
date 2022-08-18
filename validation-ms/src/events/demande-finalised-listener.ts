import { Message } from 'node-nats-streaming'
import { Subjects, Listener, DemandefinalisedEvent, BRError } from '@anismenaapfeesi/common-api'
import { Demande } from '../model/demande'

export class DemandefinalisedListener extends Listener<DemandefinalisedEvent> {
  subject: Subjects.DemandeFinalised = Subjects.DemandeFinalised
  queueGroupName = 'validation-service'

  async onMessage(data: DemandefinalisedEvent['data'], msg: Message) {
    const {id} = data
    
    const demande = await Demande.findById({_id:id})

    if (!demande) {
      throw new BRError("demande does not exist ")
    }

    await demande.updateOne({
      finalised: true
    })

    msg.ack()
  }
}
