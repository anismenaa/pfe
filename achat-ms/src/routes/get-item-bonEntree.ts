import { BRError, currentUser, requireAuth } from '@anismenaapfeesi/common-api'
import express from 'express'
import { Item } from '../models/item'

const router = express.Router()

router.get('/api/achats/items/:idBonEntree', currentUser, requireAuth, async (req, res) => {
  
  if (req.currentUser?.authorization!=6){
    throw new BRError('you are not authorized')
  }

  const idBonEntree = req.params.idBonEntree

  // fetch
  await Item.find({bonEntreeId: idBonEntree})
    .then ((data) => {
      res.status(200).send(data)
    })
    .catch(()=> {
      throw new BRError('an error occured while retreiving bon Entree')
    })

})


export {router as getAllItems}