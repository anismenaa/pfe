import { BRError, currentUser, natsWrapper, requireAuth, validateRequest } from '@anismenaapfeesi/common-api'
import express, {Request, Response} from 'express'
import { body } from 'express-validator'
import { BonEntreeCreatedPublisher } from '../events/bonEntree-created-publisher'
import { BonEntree } from '../models/bonEntree'

const router = express.Router()


router.post('/api/achats/bon_entree/create',[
  body('vendor')
    .isString()
    .withMessage('fournisseur must be valid')
],validateRequest ,currentUser, requireAuth, 
async (req: Request, res: Response) => {
  //check that the user works in the achat departement 6
  if (req.currentUser?.authorization != 6) {
    throw new BRError('you are not authorized, must work in the supply department !')
  }
  const { vendor } = req.body
  const total = 0
  const validate_BE = false

  console.log(vendor, ' ', total)

  const bonEntree =  BonEntree.build({
    vendor,
    total,
    validate_BE
  })
  await bonEntree.save()
    .then(()=> {
      res.status(200).send('bon entree created successfully .')  
      // publish the bonEntree:created to stock-ms
      new BonEntreeCreatedPublisher(natsWrapper.client).publish({
        id: bonEntree.id,
        vendor: bonEntree.vendor,
        total: bonEntree.total,
        validate_BE: bonEntree.validate_BE
      })
    })
    .catch(()=> {
      throw new BRError('an error occured while creating a bonEntree')
    })
      
}) 


export {router as createBonEntree}