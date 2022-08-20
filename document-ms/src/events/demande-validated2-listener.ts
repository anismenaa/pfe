import { Message } from 'node-nats-streaming'
import { Subjects, Listener, DemandeValidated2Event, BRError } from '@anismenaapfeesi/common-api'
import { Demande } from '../model/demande'

export class DemandeValidated2Listener extends Listener<DemandeValidated2Event> {
  subject: Subjects.DemandeValidated2 = Subjects.DemandeValidated2
  queueGroupName = 'document-service'

  async onMessage(data: DemandeValidated2Event['data'], msg: Message) {
    const {id} = data

    const demandeExist = await Demande.findById({_id: id})

    if (!demandeExist) {
      throw new BRError("demande does not exist ")
    }

    await demandeExist.updateOne({
      validation_2: true
    })

    msg.ack()
  }
}
