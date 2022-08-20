import { BRError, currentUser, requireAuth } from '@anismenaapfeesi/common-api'
import express, {Request, Response} from 'express'
import { Demande } from '../../model/demande'
import { Item } from '../../model/item'
import { demandeAchatData } from './data-interface'


const router = express.Router()


router.get('/api/document/demande_achat/:demandeId', currentUser, requireAuth,
async (req: Request, res: Response) => {
  const demande = await Demande.findById(req.params.demandeId)

  if (!demande) {
    throw new BRError("demande achat with this id does not exist")
  }
  // who can view : 2, 6
  if ((req.currentUser?.authorization === 2) || (req.currentUser?.authorization === 6) || (req.currentUser?.departementId === demande?.departementId)) {
    // we get the demandes and the items 
    //const demandes = await Demande.find({})
    
    let alldemandes: demandeAchatData[] = []
    
      const items = await Item.find({demandeId: demande!._id})
      let elt: demandeAchatData = {
        demandeId: demande._id,
        departementId: demande.departementId,
        userId: demande.userId,
        items: items,
        title: demande.title,
        validation_1: demande.validation_1,
        validation_2: demande.validation_2,
        finalised: demande.finalised
      }
  

    res.status(200).send(elt)
  } else {
    throw new BRError('you are not authorised to check all the demandes achats')
  }
})



export { router as demandeAchatGetOneById }