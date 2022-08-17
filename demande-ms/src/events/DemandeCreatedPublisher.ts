import {Publisher, Subjects, DemandeCreatedEvent} from '@anismenaapfeesi/common-api'

export class DemandeCreatedPublisher extends Publisher<DemandeCreatedEvent> {
  // the name of the channel 
  subject: Subjects.DemandeCreated = Subjects.DemandeCreated
}