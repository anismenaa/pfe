import { BRError, currentUser, requireAuth } from '@anismenaapfeesi/common-api'
import express from 'express'
import { Item } from '../models/item'

const router = express.Router()


router.get('/api/achats/item/:idItem', currentUser, requireAuth, async (req, res) => {
  if (req.currentUser?.authorization!=6) {
    throw new BRError('you go no authorisation')
  }
  const itemId = req.params.idItem
  // get me the item
  await Item.findById({_id: itemId})
    .then((item)=> {
      res.status(200).send(item)
    })
    .catch((err)=> {
      throw new BRError('an error occured while getting the item')
    })
})


export {router as itemGetOne}