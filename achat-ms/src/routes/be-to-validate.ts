import { currentUser, requireAuth, BRError } from '@anismenaapfeesi/common-api'
import express, {Request, Response} from 'express'
import { BonEntree } from '../models/bonEntree'

const router = express.Router()

router.get('/api/achats/be-to-validate', currentUser, requireAuth,
async (req: Request, res: Response)=> {
 
  await BonEntree.find({validate_BE: false})
    .then((data) => {
      res.status(200).send(data)
    })
    .catch(() => {
      throw new BRError('an error has occured while finding bon entrees')
    })
})


export {router as getAllBonEntreesToValidate}