import { Message } from 'node-nats-streaming'
import { Subjects, Listener, DemandeCreatedEvent } from '@anismenaapfeesi/common-api'
import { Demande } from '../model/demande'

export class DemandeCreatedListener extends Listener<DemandeCreatedEvent> {
  subject: Subjects.DemandeCreated = Subjects.DemandeCreated
  queueGroupName = 'validation-service'

  async onMessage(data: DemandeCreatedEvent['data'], msg: Message) {
    const {id, userId, departementId, title, date_creation, validation_1, validation_2, finalised, end_of_treatment} = data
    
    const demande = Demande.build({
      id,
      userId,
      departementId,
      title,
      date_creation,
      validation_1,
      validation_2,
      finalised,
      end_of_treatment
    })

    await demande.save()

    msg.ack()
  }
}
