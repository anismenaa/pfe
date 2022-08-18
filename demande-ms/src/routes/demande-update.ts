import { currentUser, natsWrapper, requireAuth } from '@anismenaapfeesi/common-api'
import express, {Request, Response} from 'express'
import { Demande } from '../model/demande'
import { DemandeFinalisedPublisher } from '../events/DemandeFinalisedPublisher'

const router = express.Router()

router.put('/api/demandes/finalise/:id', currentUser, requireAuth, async(req: Request, res: Response) => {
  const demandeId = req.params.id
  console.log(demandeId)
  // check for the exist demande
  const demandeExist = await Demande.findById({_id: demandeId})
  console.log(demandeExist)
  if (!demandeExist) {
    return res.status(401).send('cannot update a demande that does not exist')
  }

  if (demandeExist.finalised === true) {
    console.log('this demande is finalised')
    return res.status(401).send('demande is already finalised, waiting for the validation')
  }
  await demandeExist.updateOne({finalised: true})
  //publish
  new DemandeFinalisedPublisher(natsWrapper.client).publish({
    id: demandeId
  })
  res.status(200).send(`demande id: ${demandeId} has been finalised`)
    
      
})




export {router as demandeUpdatedRouter}