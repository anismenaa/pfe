import { BRError, currentUser, requireAuth } from '@anismenaapfeesi/common-api'
import express, {Request, Response} from 'express'
import { BonSortie } from '../models/bonSortie'
import { ItemBs } from '../models/itemSortie'

const router = express.Router()


router.get('/api/stock/items/bon_sortie/:id', currentUser, requireAuth,
async(req: Request, res: Response) => {
  // check for the authorization 
  if (req.currentUser?.authorization != 4 ){
    throw new BRError('you are not authorized to get the items of this bon sortie')
  }

  const bonSortieId = req.params.id
  // check for its existance
  const bsexist = await BonSortie.findById(bonSortieId)
  if (!bsexist) {
    throw new BRError('bon de sortie does not exists')
  }


  // get the items 
  // fetch
  console.log(bonSortieId)
  await ItemBs.find({bonSortieId: bonSortieId})
    .then ((data) => {
      res.status(200).send(data)
    })
    .catch(()=> {
      throw new BRError('an error occured while retreiving bon Sortie')
    })


})


export {router as itemGetAllForBs}