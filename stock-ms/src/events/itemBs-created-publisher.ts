import {Publisher, Subjects, ItemBsCreatedEvent} from '@anismenaapfeesi/common-api'

export class ItemBsCreatedPublisher extends Publisher<ItemBsCreatedEvent> {
  // the name of the channel 
  subject: Subjects.ItemBsCreated = Subjects.ItemBsCreated
}