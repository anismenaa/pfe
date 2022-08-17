import {Publisher, Subjects, DepartementCreatedEvent} from '@anismenaapfeesi/common-api'

export class DepartementCreatedPublisher extends Publisher<DepartementCreatedEvent> {
  // the name of the channel 
  subject: Subjects.DepartementCreated = Subjects.DepartementCreated
}