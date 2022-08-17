import { currentUser, natsWrapper, requireAuth } from '@anismenaapfeesi/common-api'
import express, {Request, Response} from 'express'
import { Demande } from '../model/demande'
import { DemandeFinalisedPublisher } from '../events/DemandeFinalisedPublisher'

const router = express.Router()

router.put('/api/demandes/update/:id', currentUser, requireAuth, async(req: Request, res: Response) => {
  const demandeId = req.params.id

  // check for the exist demande
  const demandeExist = await Demande.findById({_id: demandeId})

  if (!demandeExist) {
    return res.status(401).send('cannot update a demande that does not exist')
  }

  if (demandeExist.finalised === true) {
    return res.status(201).send('demande is already finalised, waiting for the validation')
  }
  await Demande.updateOne({demandeId}, {
    finalised: true
  })
    .then (()=> {
        // then publish it.
      try {
        new DemandeFinalisedPublisher(natsWrapper.client).publish({
          id: demandeId
        })

      } catch (error) {
      console.log(error) 
      }
      res.status(200).send(`demande id: ${demandeId} has been finalised`)
    })
    .catch(err => {
      console.log('an error occured when finalising the demande.')
      res.status(401).send('an error occured when finalising the demande.')
    })
  
  

})




export {router as demandeUpdatedRouter}