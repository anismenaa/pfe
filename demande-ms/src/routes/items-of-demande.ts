import { currentUser, requireAuth } from '@anismenaapfeesi/common-api'
import express, {Request, Response} from 'express'
import 'express-async-errors'

// get the model
import {Item} from '../model/item'

const router = express.Router()

router.get('/api/items/:demandeId', currentUser, requireAuth, async (req: Request, res: Response) => {
  // get the params 
  const demandeId = req.params.demandeId

  const itemList = await Item.find({demandeId})

  res.status(201).send(itemList)
})

export {router as itemsOfDemandeRouter}