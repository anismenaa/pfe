import { BRError, currentUser, natsWrapper, requireAuth } from '@anismenaapfeesi/common-api'
import express, { Request, Response } from 'express'
import { BonEntreeValidatedPublisher } from '../events/bonEntree-validated-publisher'
import { BonEntree } from '../models/bonEntree'

const router = express.Router()

router.put('/api/achats/bon_entree/validate/:id', currentUser, requireAuth,
async(req: Request, res: Response) => {
  // check for the authorization
  if (req.currentUser?.authorization != 2) {
    throw new BRError('you are not authorized to finalise this bon entre')
  }
  // get the id
  const bonEntreeId = req.params.id
  // check for its existance
  const bonEntreeIdExist = await BonEntree.findById(bonEntreeId)

 

  if (bonEntreeIdExist) {
    if (bonEntreeIdExist?.validate_BE) {
      throw new BRError('bon de entree is already validated')
    }
    // if existed 
    bonEntreeIdExist.updateOne({
      validate_BE: true
    })
      .then((data) => {
        // we publish the finalisation
        new BonEntreeValidatedPublisher(natsWrapper.client).publish({
          id:bonEntreeIdExist.id
        })
        //then send the result to the client
        res.status(201).send(`bon entree with id: ${req.params.bonEntreeId} is finalised`)
      })
      .catch(() => {
        res.status(401).send('an error occured while validating the bon entree')
      })
  } else {
    throw new BRError(`the bon entree holding id: ${req.params.bonEntreeId} does not exist! `)
  }
})


export { router as BonEntreeValidated }