import {Publisher, Subjects, BonSortieFinaliseEvent} from '@anismenaapfeesi/common-api'

export class BonSortieFinalisedPublisher extends Publisher<BonSortieFinaliseEvent> {
  // the name of the channel 
  subject: Subjects.BonSortieFinalise = Subjects.BonSortieFinalise
}