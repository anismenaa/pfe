import {Publisher, Subjects, BonSortieCreatedEvent} from '@anismenaapfeesi/common-api'

export class BonSortieCreatedPublisher extends Publisher<BonSortieCreatedEvent> {
  // the name of the channel 
  subject: Subjects.BonSortieCreated = Subjects.BonSortieCreated
}