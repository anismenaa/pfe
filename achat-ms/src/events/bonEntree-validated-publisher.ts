import {Publisher, Subjects, BonEntreeValidatedEvent} from '@anismenaapfeesi/common-api'

export class BonEntreeValidatedPublisher extends Publisher<BonEntreeValidatedEvent> {
  // the name of the channel 
  subject: Subjects.BonEntreeValidated = Subjects.BonEntreeValidated
}