import {Publisher, Subjects, ItemDeletedEvent} from '@anismenaapfeesi/common-api'

export class ItemDeletedPublisher extends Publisher<ItemDeletedEvent> {
  // the name of the channel 
  subject: Subjects.ItemDeleted = Subjects.ItemDeleted
}