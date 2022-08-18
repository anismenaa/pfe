import { requireAuth, currentUser, BRError, natsWrapper } from '@anismenaapfeesi/common-api'
import express, {Request, Response} from 'express'
import { Demande } from '../model/demande'
import { DemandeValidated1publisher } from '../events/demande-validated1-publisher'
import { DemandeValidated2publisher } from '../events/demande-validated2-publisher'

const router = express.Router()

router.put('/api/validation/:demandeId', currentUser, requireAuth, async (req: Request, res: Response) => {
  // we check if the user is a director of the departement (3) or the supply director (2)
  // from authorization
  const authorization = req.currentUser?.authorization
  const departementId = req.currentUser?.departementId
  const demandeId = req.params.demandeId

  const demandeExist = await Demande.findById({_id: demandeId})
  if (!demandeExist || !demandeExist.finalised) {
    throw new BRError('demande you tryning to validate does not exist or does not finalised !')
  }
  if (authorization !=2 && authorization!=3) {
    throw new BRError('you got no access to validate a demande')
  }
  if (authorization === 3 && departementId ===demandeExist.departementId) {
    // work to do for the director
    // if the demande exists we check for the validation_1 if it is true or not
    if (demandeExist.validation_1 === true) {
      throw new BRError('you already validated this demande')
    }
    // if false we validate the validation_1 = true
    await demandeExist.updateOne({
      validation_1: true
    })
      .then(() => {
        // we publish the event 
        new DemandeValidated1publisher(natsWrapper.client).publish({
          id: demandeId
        })
        res.status(200).send("demande was validated by the director of the departement")
      })

  } else {
      if (authorization === 2 && departementId ===demandeExist.departementId) {
        if (demandeExist.validation_2 === true) {
          throw new BRError('you already validated this demande')
        }
        // if false we validate the validation_1 = true
        await demandeExist.updateOne({
          validation_1:true,
          validation_2: true
        })
          .then(() => {
            // we publish the event 
            new DemandeValidated2publisher(natsWrapper.client).publish({
              id: demandeId
            })
            new DemandeValidated1publisher(natsWrapper.client).publish({
              id: demandeId
            })
            res.status(200).send("validation_1 and validation_2 was validated by the supply director")
          })
    
      } else {
        if (authorization === 2 ) {
          if (demandeExist.validation_1==false) {
            throw new BRError('the departement director must validate this demande first')
          }
          // work to do for the supply director channel
          if (demandeExist.validation_2 === true) {
            throw new BRError('you already validated this demande')
          }
          // if false we validate the validation_1 = true
          await demandeExist.updateOne({
            validation_2: true
          })
            .then(() => {
              // we publish the event 
              new DemandeValidated2publisher(natsWrapper.client).publish({
                id: demandeId
              })
              res.status(200).send("demande was validated by the supply director")
            })
      
        }
        
      }
  }
  
  
})



export { router as validateDemandeRouter }
