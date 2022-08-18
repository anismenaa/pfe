import {Publisher, Subjects, BonEntreeCreatedEvent} from '@anismenaapfeesi/common-api'

export class BonEntreeCreatedPublisher extends Publisher<BonEntreeCreatedEvent> {
  // the name of the channel 
  subject: Subjects.BonEntreeCreated = Subjects.BonEntreeCreated
}