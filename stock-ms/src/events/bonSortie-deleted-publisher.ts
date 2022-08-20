import {Publisher, Subjects, BonSortieDeletedEvent} from '@anismenaapfeesi/common-api'

export class BonSortieDeletedPublisher extends Publisher<BonSortieDeletedEvent> {
  // the name of the channel 
  subject: Subjects.BonSortieDeleted = Subjects.BonSortieDeleted
}