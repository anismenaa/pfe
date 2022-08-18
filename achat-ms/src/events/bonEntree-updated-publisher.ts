import {Publisher, Subjects, BonEntreeUpdatedEvent} from '@anismenaapfeesi/common-api'

export class BonEntreeUpdatedPublisher extends Publisher<BonEntreeUpdatedEvent> {
  // the name of the channel 
  subject: Subjects.BonEntreeUpdated = Subjects.BonEntreeUpdated
}