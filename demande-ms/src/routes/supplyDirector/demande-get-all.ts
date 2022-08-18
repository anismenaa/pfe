import { BRError, currentUser, requireAuth } from '@anismenaapfeesi/common-api'
import express from 'express'
import { Demande } from '../../model/demande'

const router = express.Router()


router.get('/api/demandes/validated', currentUser, requireAuth, async(req, res) => {
  
  if (req.currentUser?.authorization===2) {
    const allDemandesOfDepartement =await Demande.find({validation_2: true})
    res.status(200).send(allDemandesOfDepartement)
  }else {
    throw new BRError('you must be a director of a departement')
  }
})



export {router as getDemandesDep}