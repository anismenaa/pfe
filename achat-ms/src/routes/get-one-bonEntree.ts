import { currentUser, requireAuth, BRError } from '@anismenaapfeesi/common-api'
import express, {Request, Response} from 'express'
import { BonEntree } from '../models/bonEntree'

const router = express.Router()

router.get('/api/achats/bon_entree/:id', currentUser, requireAuth,
async (req: Request, res: Response)=> {

  const bonEntreeId = req.params.id

  await BonEntree.findById(bonEntreeId)
    .then((data) => {
      res.status(200).send(data)
    })
    .catch(() => {
      throw new BRError('an error has occured while finding bon entrees')
    })
})


export {router as getOneBonEntrees}