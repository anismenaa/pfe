import { BRError, currentUser, natsWrapper, requireAuth } from '@anismenaapfeesi/common-api'
import express from 'express'
import { ItemBsCreatedPublisher } from '../events/itemBs-created-publisher'
import { BonSortie } from '../models/bonSortie'
import { Item } from '../models/itemAchat'
import { ItemBs } from '../models/itemSortie'

const router = express.Router()

router.post('/api/stock/item/create/:id', currentUser, requireAuth,
async(req, res) => {
  // check for the authorization
  if (req.currentUser?.authorization != 4) {
    throw new BRError('you are not authorized to add item to this bon sortie')
  }

  //check if the bon sortie exists
  const bonSortie = await BonSortie.findById(req.params.id)
  
  if (!bonSortie) {
    throw new BRError(`bon sortie holding id: ${req.params.id} does not exist`)
  }

  if (bonSortie.finalised) {
    throw new BRError('bon finalised, you cannot add items')
  }

  let {itemId, quantity} = req.body

  // now retreieve the item from items of bon entree
  const itemBe = await Item.findById(itemId)
  if (!itemBe) {
    throw new BRError('the item u trying to retreive does not exist')
  }

  if (quantity> itemBe.quantity) {
    throw new BRError('quantity is superior, please choose less or check your stock !')
  }

  const itembs = await ItemBs.findOne({itemId:itemId})
  if(itembs) {
    quantity = itembs?.quantity + parseInt(quantity)
    //we delete 
    await itembs.delete()
      .then(()=> {
        console.log('item deleted, now wait for the update')
      })
      .catch(()=> {
        console.log('an error while deleting the item')
      })
  }
  
   
  // build and save 
  const itemBuild = ItemBs.build({
    itemId: itemId,
    bonSortieId: req.params.id,
    quantity: quantity
  })

  const finalQuantity = itemBe.quantity - quantity
  await itemBuild.save()
    .then(async (data)=> {
      new ItemBsCreatedPublisher(natsWrapper.client).publish({
        id: itemBuild.id,
        bonSortie: itemBuild.bonSortieId,
        quantity: itemBuild.quantity,
        itemId: itemBuild.itemId
      })
      // on va modifier la quantité dans l'autre table
      await Item.findOneAndUpdate({_id: itemId}, {
        quantity: finalQuantity
      })
      res.status(201).send({
        msg: 'item added successuly',
        data: data
      })
    })
})


export { router as itemCreateBs }