import { requireAuth, currentUser, BRError } from '@anismenaapfeesi/common-api'
import express, { Request, Response } from 'express'
import { BonSortie } from '../../model/bonSortie'
import { ItemAchat } from '../../model/itemAchat'
import { ItemBs } from '../../model/itemSortie'
import { bonSortieData, itemBsData } from './data-interface'

const router = express.Router()


router.get('/api/document/bon_sortie/:bonSortieId', currentUser, requireAuth,
async (req: Request, res: Response) => {
  // see the authorization 
  if (req.currentUser?.authorization!=4) {
    throw new BRError("you are not authorised, try a stockage user.")
  }

  // get all bon sortie
  const bonSortie = await BonSortie.findById(req.params.bonSortieId)

  if (!bonSortie) {
    throw new BRError("bon sortie with this id does not exist")
  }
 
  if (bonSortie.finalised === true) {
    // id bonsortie
    const bonSortieId = bonSortie._id
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
      bonSortieId: bonSortie._id,
      departementId: bonSortie.departementId,
      date_sortie: bonSortie.date_sortie,
      finalised: bonSortie.finalised,
      finalisedBy: bonSortie.finalisedBy,
      items: items
    }

    res.status(200).send(oneBonSortie)
  } else {
    throw new BRError("bon sortie not finalised")
  }

})


export { router as bonSortieGetOne }