import { BRError, currentUser, requireAuth } from '@anismenaapfeesi/common-api'
import express, {Request, Response} from 'express'
import { BonSortie } from '../models/bonSortie'

const router = express.Router()


router.delete('/api/stock/bon_sortie/delete/:idBonSortie', 
currentUser, requireAuth,
async(req: Request, res: Response) => {
  // check for the authorization
  if (req.currentUser?.authorization != 4) {
    throw new BRError('you are not authorized to delete a bon sortie')
  }
  // get the bon sortie id and check for its existence and whether it is finalised or not

  const bonSortieExist = await BonSortie.findById(req.params.idBonSortie)
  if (bonSortieExist) {
    // check for the finalisation 
    if (bonSortieExist.finalised) {
      throw new BRError('this bon sortie is finalised')
    }
    // then delete it and publish the event
    await bonSortieExist.delete()
      .then(()=> {
        res.status(200).send(`bon sortie holding id: ${req.params.idBonSortie} is deleted`)
      })
  }else{
    throw new BRError('the bon sortie looking for does not exists, please try one more time !')
  }
})


export {router as bonSortieDeleted}