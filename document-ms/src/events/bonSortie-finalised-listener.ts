import { Message } from 'node-nats-streaming'
import { Subjects, Listener, BonSortieFinaliseEvent, BRError } from '@anismenaapfeesi/common-api'
import { BonSortie } from '../model/bonSortie'

export class BonSortiefinalisedListener extends Listener<BonSortieFinaliseEvent> {
  subject: Subjects.BonSortieFinalise = Subjects.BonSortieFinalise
  queueGroupName = 'document-service'

  async onMessage(data: BonSortieFinaliseEvent['data'], msg: Message) {
    const {id, finalisedBy} = data
    
    const bonSortieExist = await BonSortie.findById({_id:id})

    if (!bonSortieExist) {
      throw new BRError("bon sortie does not exist ")
    }

    await bonSortieExist.updateOne({
      finalised: true,
      finalisedBy: finalisedBy
    })

    msg.ack()
  }
}
