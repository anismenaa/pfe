import { BRError, currentUser, requireAuth } from '@anismenaapfeesi/common-api'
import express, { Request, Response } from 'express'
import { BonSortie } from '../models/bonSortie'

const router = express.Router()


router.get('/api/stock/bon_sortie/:id', currentUser, requireAuth,
async (req: Request, res: Response) => {
    // check for the authorization
    if (req.currentUser?.authorization != 4) {
      throw new BRError('you are not authorized to get the bon sortie')
    }
    // get the id
    const bonSortieId = req.params.id
    //check for its existence 
    const bonSortieExists = await BonSortie.findById(bonSortieId)

    if (bonSortieExists) {
      // send the result to the client
      res.status(200).send(bonSortieExists)
    } else {
      throw new BRError(`bon sortie holding the id: ${bonSortieId} does not exist`)
    }
})


export { router as bonSortieGetOne }