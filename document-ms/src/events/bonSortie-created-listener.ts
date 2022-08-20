import { Message } from 'node-nats-streaming'
import { Subjects, Listener, BonSortieCreatedEvent } from '@anismenaapfeesi/common-api'
import { BonSortie } from '../model/bonSortie'

export class BonSortieCreatedListener extends Listener<BonSortieCreatedEvent> {
  subject: Subjects.BonSortieCreated = Subjects.BonSortieCreated
  queueGroupName = 'document-service'

  async onMessage(data: BonSortieCreatedEvent['data'], msg: Message) {


    const { id, date_sortie, departementId, finalised, finalisedBy } = data
    
    const bonSortie = BonSortie.build({
      id,
      date_sortie,
      departementId,
      finalised,
      finalisedBy
    })

    await bonSortie.save()
      .then(()=> {
        console.log('bon sortie created successfully in the document ms')
      })
    msg.ack()
  }
}
