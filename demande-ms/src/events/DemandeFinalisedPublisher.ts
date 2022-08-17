import {Publisher, Subjects, DemandefinalisedEvent } from '@anismenaapfeesi/common-api'

export class DemandeFinalisedPublisher extends Publisher<DemandefinalisedEvent> {
  // the name of the channel 
  subject: Subjects.DemandeFinalised = Subjects.DemandeFinalised
}