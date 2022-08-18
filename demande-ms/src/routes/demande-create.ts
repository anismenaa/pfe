import express, {Request, Response} from 'express'
import { currentUser, requireAuth, natsWrapper } from '@anismenaapfeesi/common-api'
import { body } from 'express-validator'
import { Demande } from '../model/demande'
import { DemandeCreatedPublisher} from '../events/DemandeCreatedPublisher'
const router = express.Router()

router.post('/api/demandes/create', [
  body('title')
    .isString()
    .withMessage('title must be valid')
], currentUser, requireAuth, async(req: Request, res: Response) => {
  const userId = req.currentUser?.id
  const departementId = req.currentUser?.departementId
  const {title} = req.body
  // creation de la demande finale 
  const demande = Demande.build({
    userId: userId!,
    departementId: departementId!,
    title: title,
    date_creation: new Date(),
    validation_1: false,
    validation_2: false,
    finalised: false,
    end_of_treatment: false
  })

  // we save and then publish the event
  await demande.save()

  try {
    // after we save we publish an event departement:created
    new DemandeCreatedPublisher(natsWrapper.client).publish({
      id: demande.id,
      title: demande.title,
      userId: demande.userId,
      departementId: demande.departementId,
      date_creation: demande.date_creation,
      validation_1: demande.validation_1,
      validation_2: demande.validation_2,
      finalised: demande.finalised,
      end_of_treatment: demande.end_of_treatment
    })

    res.status(201).send(demande)

  } catch (error) {
  console.log(error) 
  }
})

export {router as demandeCreateRouter}