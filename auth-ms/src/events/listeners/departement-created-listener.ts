import { Message } from 'node-nats-streaming'
import { Subjects, Listener, DepartementCreatedEvent } from '@anismenaapfeesi/common-api'
import { Departement } from '../../model/departement'

export class DepartementCreatedListener extends Listener<DepartementCreatedEvent> {
  subject: Subjects.DepartementCreated = Subjects.DepartementCreated
  queueGroupName = 'auth-service'

  async onMessage(data: DepartementCreatedEvent['data'], msg: Message) {
    const { id, name } = data
    
    const departement = Departement.build({
      id,
      name
    })

    await departement.save()

    msg.ack()
  }
}
