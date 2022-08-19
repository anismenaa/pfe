import { currentUser, requireAuth, BRError } from '@anismenaapfeesi/common-api'
import express, {Request, Response} from 'express'
import { BonEntree } from '../models/bonEntree'

const router = express.Router()

router.get('/api/stock/bon_entree', currentUser, requireAuth,
async (req: Request, res: Response)=> {
  if (req.currentUser?.authorization!=4) {
    throw new BRError('you are not authorized, must work in the supply department !')
  }

  await BonEntree.find({})
    .then((data) => {
      res.status(200).send(data)
    })
    .catch(() => {
      throw new BRError('an error has occured while finding bon entrees')
    })
})


export {router as getAllBonEntrees}