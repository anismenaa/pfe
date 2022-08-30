import { requireAuth, currentUser, BRError } from '@anismenaapfeesi/common-api'
import express, { Request, Response } from 'express'
import { BonSortie } from '../../model/bonSortie'
import { ItemAchat } from '../../model/itemAchat'
import { ItemBs } from '../../model/itemSortie'
import { bonSortieData, itemBsData } from './data-interface'

const router = express.Router()


router.get('/api/document/bon_sortie/getAll', currentUser, requireAuth,
async (req: Request, res: Response) => {
  // see the authorization 
  if (req.currentUser?.authorization!=4) {
    throw new BRError("you are not authorised, try a stockage user.")
  }

  // get all bon sortie
  const bonSortieAll = await BonSortie.find({finalised:true})

  const result: bonSortieData[] = []
  for(let i = 0; i < bonSortieAll.length; i++) {
    if (bonSortieAll[i].finalised === true) {
      // id bonsortie
      const bonSortieId = bonSortieAll[i]._id
      const itemBsAllForBs = await ItemBs.find({bonSortieId: bonSortieId})
      const items:itemBsData[] = []
      for(let j = 0; j < itemBsAllForBs.length; j++) {
        const item = await ItemAchat.findById(itemBsAllForBs[j].itemId)
        if(item) {
          const elt: itemBsData = {
            name: item!.name,
            quantity: itemBsAllForBs[j].quantity
          }

          items.push(elt)
        }
      }

      const oneBonSortie: bonSortieData = {
        bonSortieId: bonSortieAll[i]._id,
        departementId: bonSortieAll[i].departementId,
        date_sortie: bonSortieAll[i].date_sortie,
        finalised: bonSortieAll[i].finalised,
        finalisedBy: bonSortieAll[i].finalisedBy,
        items: items
      }

      result.push(oneBonSortie)

    }
  }

  res.status(200).send(result)
})


export { router as bonSortieGetAll }