import { BRError, currentUser, requireAuth, natsWrapper } from '@anismenaapfeesi/common-api'
import express, {Request, Response} from 'express'
import { BonEntreeDeletedPublisher } from '../events/bonEntree-deleted-publisher'
import { ItemAchatDeletedPublisher } from '../events/ItemAchat-deteleted-publisher'
import { BonEntree } from '../models/bonEntree'
import { Item } from '../models/item'
import { itemCreateRouter } from './item-create'


const router = express.Router()

router.delete('/api/achats/bon_entree/delete/:id', currentUser, requireAuth,
async (req: Request, res: Response) => {
  if (req.currentUser?.authorization!=6) {
    throw new BRError('you are not authorized, must work in the supply department !')
  }
  const bonEntreeId = req.params.id
  // fetch for it in the db
  const bonEntreeExist = await BonEntree.findById(bonEntreeId)
  if(!bonEntreeExist) {
    throw new BRError('bon entree does not exist or has been deleted')
  }

  if(bonEntreeExist.validate_BE) {
    throw new BRError('you cannot delete a validated bon entree.')
  }
  await BonEntree.deleteOne({_id: bonEntreeId})
    .then(async ()=> {
      console.log(`bon entree Id: ${bonEntreeId} is deleted`)
      new BonEntreeDeletedPublisher(natsWrapper.client).publish({
        id: bonEntreeId
      })
      res.status(201).send('bon entree deleted, lets now proceed in deleting its items')
    })
    .catch((error)=>{
      res.status(400).send('an error was occured while creating bon Entree')
    })
  
  //delete the items
  const numberItem = await Item.find({bonEntreeId: bonEntreeId})
  numberItem.forEach(async (item) => {
    await item.deleteOne()
    new ItemAchatDeletedPublisher(natsWrapper.client).publish({
      id: item._id
    })
  })
})



export {router as deleteBonEntree}
