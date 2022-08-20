import {Publisher, Subjects, ItemBsDeletedEvent} from '@anismenaapfeesi/common-api'

export class ItemBsDeletedPublisher extends Publisher<ItemBsDeletedEvent> {
  // the name of the channel 
  subject: Subjects.ItemBsDeleted = Subjects.ItemBsDeleted
}