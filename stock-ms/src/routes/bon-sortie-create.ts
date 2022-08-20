import { BRError, currentUser, natsWrapper, requireAuth } from '@anismenaapfeesi/common-api'
import express, {Request, Response} from 'express'
import { body } from 'express-validator'
import { BonSortieCreatedPublisher } from '../events/bonSortie-created-publisher'
import { BonSortie } from '../models/bonSortie'


const router = express.Router()


router.post('/api/stock/bon_sortie/create', currentUser, requireAuth,
async (req: Request, res: Response) => {
  // first we check the authorization 
  if (req.currentUser?.authorization != 4) {
    throw new BRError('you are not authorized to create a bon sortie')
  }
  // we get the req.body 
  const {departementId} = req.body
  // set the other variables
  const date_sortie = new Date()
  const finalised = false 
  const finalisedBy = "none"
  // then we build our model
  const newBonSortie = BonSortie.build({
    departementId,
    date_sortie,
    finalised,
    finalisedBy
  })

  // then we save it in db
  await newBonSortie.save()
    .then((data)=>{
      // we publish the event as if the bon sortie is created BonSortie:created
      new BonSortieCreatedPublisher(natsWrapper.client).publish({
        id: newBonSortie.id,
        departementId: newBonSortie.departementId,
        date_sortie: newBonSortie.date_sortie,
        finalised: newBonSortie.finalised,
        finalisedBy: newBonSortie.finalisedBy,
      })
      res.status(201).send(data)
    })
    .catch(()=> {
      throw new BRError('an error occured while createing bon sortie')
    })
  

} )


export {router as bonSortieCreate}