import { Message } from 'node-nats-streaming'
import { Subjects, Listener, DemandeValidated1Event, BRError } from '@anismenaapfeesi/common-api'
import { Demande } from '../model/demande'

export class DemandeValidated1Listener extends Listener<DemandeValidated1Event> {
  subject: Subjects.DemandeValidated1 = Subjects.DemandeValidated1
  queueGroupName = 'document-service'

  async onMessage(data: DemandeValidated1Event['data'], msg: Message) {
    const {id} = data

    const demandeExist = await Demande.findById({_id: id})

    if (!demandeExist) {
      throw new BRError("demande does not exist ")
    }

    await demandeExist.updateOne({
      validation_1: true
    })

    msg.ack()
  }
}
