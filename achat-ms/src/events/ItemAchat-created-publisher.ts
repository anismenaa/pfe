import {Publisher, Subjects, ItemAchatCreatedEvent} from '@anismenaapfeesi/common-api'

export class ItemAchatCreatedPublisher extends Publisher<ItemAchatCreatedEvent> {
  // the name of the channel 
  subject: Subjects.ItemAchatCreated = Subjects.ItemAchatCreated
}