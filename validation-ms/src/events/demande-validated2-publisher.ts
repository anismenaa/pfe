import {Publisher, Subjects, DemandeValidated2Event} from '@anismenaapfeesi/common-api'

export class DemandeValidated2publisher extends Publisher<DemandeValidated2Event> {
  // the name of the channel 
  subject: Subjects.DemandeValidated2 = Subjects.DemandeValidated2
}