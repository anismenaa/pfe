import {Publisher, Subjects, ItemCreatedEvent} from '@anismenaapfeesi/common-api'

export class ItemCreatedPublisher extends Publisher<ItemCreatedEvent> {
  // the name of the channel 
  subject: Subjects.ItemCreated = Subjects.ItemCreated
}