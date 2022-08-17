import { requireAuth, currentUser, BRError } from '@anismenaapfeesi/common-api'
import express, {Request, Response} from 'express'
import { Demande } from '../model/demande'

const router = express.Router()

router.put('/api/validate/:demandeId', currentUser, requireAuth, async (req: Request, res: Response) => {
  // we check if the user is a director of the departement (3) or the supply director (2)
  // from authorization
  const authorization = req.currentUser?.authorization
  const demandeId = req.params.demandeId
  
  if (authorization === 3) {
    // work to do for the director
    // check if the demande really exists
    const demandeExist = await Demande.findById({_id: demandeId})
    if (!demandeExist) {
      throw new BRError('demande you tryning to validate does not exist !')
    }
    // if the demande exists we check for the validation_1 if it is true or not
    if (demandeExist.validation_1 === true) {
      throw new BRError('you already validated this demande')
    }
    // if false we validate the validation_1 = true
    await Demande.updateOne({demandeId}, {
      validation_1: true
    })
      .then(() => {
        
      })

  }
  if (authorization === 2) {
    // work to do for the supply director channel

  }

  throw new BRError('an error required while validating the demande (check if you are a 2 or 3)')
})



export { router as validateDemandeRouter }
