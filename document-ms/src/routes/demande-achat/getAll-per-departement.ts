import { BRError, currentUser, requireAuth } from '@anismenaapfeesi/common-api'
import express, {Request, Response} from 'express'
import { Demande } from '../../model/demande'
import { Item } from '../../model/item'
import { demandeAchatData } from './data-interface'


const router = express.Router()


router.get('/api/document/demande_achat/perDepartement/:departementId', currentUser, requireAuth,
async (req: Request, res: Response) => {
  
  // verify if it's the same user

  if ((req.currentUser?.departementId != req.params.departementId) || (req.currentUser?.authorization === 2) || (req.currentUser?.authorization === 6)) {
    // we get the demandes and the items 
    //const demandes = await Demande.find({})
    
    let alldemandes: demandeAchatData[] = []
    const demandes = await Demande.find({departementId: req.params.departementId})

    for(let i = 0; i < demandes.length ; i++) {
      const demande = demandes[i]
      const items = await Item.find({demandeId: demande._id})
      // verify if the demande is finalised
      if (demande.finalised) {
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
        alldemandes.push(elt)
      }
    } 
  

    res.status(200).send(alldemandes)
  } else {
    throw new BRError('you are not authorised to check all the demandes achats')
  }
})



export { router as demandeAchatGetAllperDepartement }