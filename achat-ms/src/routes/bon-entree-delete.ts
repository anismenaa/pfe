import { BRError, currentUser, requireAuth, natsWrapper } from '@anismenaapfeesi/common-api'
import express, {Request, Response} from 'express'
import { BonEntreeDeletedPublisher } from '../events/bonEntree-deleted-publisher'
import { BonEntree } from '../models/bonEntree'


const router = express.Router()

router.delete('/api/achats/bon_entree/delete/:id', currentUser, requireAuth,
async (req: Request, res: Response) => {
  if (req.currentUser?.authorization!=6) {
    throw new BRError('you are not authorized, must work in the supply department !')
  }
  const bonEntreeId = req.params.id
  // fetch for it in the db
  const bonEntreeExist = await BonEntree.findById({_id: bonEntreeId})
  if(!bonEntreeExist) {
    throw new BRError('bon entree does not exist or has been deleted')
  }
  await BonEntree.deleteOne({_id: bonEntreeId})
    .then(()=> {
      console.log(`bon entree Id: ${bonEntreeId} is deleted`)
      new BonEntreeDeletedPublisher(natsWrapper.client).publish({
        id: bonEntreeId
      })
      res.status(201).send('bon entree deleted, lets now proceed in deleting its items')
    })
    .catch((error)=>{
      res.status(400).send('an error was occured while creating bon Entree')
    })
})



export {router as deleteBonEntree}
