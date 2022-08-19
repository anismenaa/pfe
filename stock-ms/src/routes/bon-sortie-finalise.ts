import { BRError, currentUser, requireAuth } from '@anismenaapfeesi/common-api'
import express, { Request, Response } from 'express'
import { BonSortie } from '../models/bonSortie'

const router = express.Router()

router.put('/api/stock/bon_sortie/finalise/:id', currentUser, requireAuth,
async(req: Request, res: Response) => {
  // check for the authorization
  if (req.currentUser?.authorization != 4) {
    throw new BRError('you are not authorized to finalise this bon sortie')
  }
  // get the id
  const bonSortieId = req.params.id
  // check for its existance
  const bonSortieExist = await BonSortie.findById(bonSortieId)

 

  if (bonSortieExist) {
    if (bonSortieExist?.finalised) {
      throw new BRError('bon de sortie is already finalised')
    }
    // if existed 
    bonSortieExist.updateOne({
      finalised: true,
      finalisedBy: req.currentUser.id
    })
      .then((data) => {
        // we publish the finalisation
        
        //then send the result to the client
        res.status(201).send(`bon sortie with id: ${req.params.bonSortieId} is finalised`)
      })
      .catch(() => {
        res.status(401).send('an error occured while finalising the bon sortie')
      })
  } else {
    throw new BRError(`the bon sortie holding id: ${req.params.bonSortieId} does not exist! `)
  }
})


export { router as bonSortieFinalisation }