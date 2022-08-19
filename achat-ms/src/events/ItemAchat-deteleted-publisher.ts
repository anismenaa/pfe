import {Publisher, Subjects, ItemAchatDeletedEvent} from '@anismenaapfeesi/common-api'

export class ItemAchatDeletedPublisher extends Publisher<ItemAchatDeletedEvent> {
  // the name of the channel 
  subject: Subjects.ItemAchatDeleted = Subjects.ItemAchatDeleted
}