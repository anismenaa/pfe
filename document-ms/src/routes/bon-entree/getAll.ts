import { BRError, currentUser, requireAuth } from '@anismenaapfeesi/common-api'
import express, { Request, Response } from 'express'
import { BonEntree } from '../../model/bonEntree'
import { ItemAchat } from '../../model/itemAchat'
import { bonEntreeData } from './data-interface'

const router = express.Router()


router.get('/api/document/bon_entree/getAll', currentUser, requireAuth,
async(req: Request, res: Response) => {
  // check for the authorization 
  if (req.currentUser?.authorization === 6 || req.currentUser?.authorization === 4 || req.currentUser?.authorization === 2) {
    // now let's get the bon_entree
    const bonEntreeAll = await BonEntree.find({})

    const all: bonEntreeData[] = []
    for(let i = 0; i < bonEntreeAll.length; i++){
      const bonEntree = bonEntreeAll[i]
      if (bonEntree.validate_BE === true) {
        // get the items of this bon entree
        const items = await ItemAchat.find({bonEntreeId: bonEntree._id})
        const elt: bonEntreeData = {
          bonEntreeId: bonEntree._id,
          vendor: bonEntree.vendor,
          validate_BE: bonEntree.validate_BE,
          items
        }
        all.push(elt)
      }
    }

    res.status(200).send(all)
  } else {
    throw new BRError("you are not authorized to get all bon entree")
  }
})


export { router as bonEntreeGetAll }