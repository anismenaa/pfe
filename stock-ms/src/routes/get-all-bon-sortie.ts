import { BRError, currentUser, requireAuth } from '@anismenaapfeesi/common-api'
import express, { Request, Response } from 'express'
import { BonSortie } from '../models/bonSortie'


const router = express.Router()


router.get('/api/stock/bon_sortie/', currentUser, requireAuth,
async(req: Request, res: Response) => {
  //first check for the authorization
  if (req.currentUser?.authorization != 4) {
    throw new BRError('you are not authorised to get all the bon sortie')
  }
  // if it is authorized, we get all bon sortie
  const allBonSortie = await BonSortie.find({})

  // we send the result to the client
  res.status(200).send(allBonSortie)
})



export { router as bonSortieGetAll }