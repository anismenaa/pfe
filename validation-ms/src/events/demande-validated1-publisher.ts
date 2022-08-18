import {Publisher, Subjects, DemandeValidated1Event} from '@anismenaapfeesi/common-api'

export class DemandeValidated1publisher extends Publisher<DemandeValidated1Event> {
  // the name of the channel 
  subject: Subjects.DemandeValidated1 = Subjects.DemandeValidated1
}