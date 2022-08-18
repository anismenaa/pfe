import {Publisher, Subjects, BonEntreeDeletedEvent} from '@anismenaapfeesi/common-api'

export class BonEntreeDeletedPublisher extends Publisher<BonEntreeDeletedEvent> {
  // the name of the channel 
  subject: Subjects.BonEntreeDeleted = Subjects.BonEntreeDeleted
}