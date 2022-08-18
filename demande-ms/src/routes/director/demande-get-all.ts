import { BRError, currentUser, requireAuth } from '@anismenaapfeesi/common-api'
import express from 'express'
import { Demande } from '../../model/demande'

const router = express.Router()


router.get('/api/demandes/departement/:departementId', currentUser, requireAuth, async(req, res) => {
  const departementId = req.params.departementId
  if (req.currentUser?.authorization===3 || req.currentUser?.authorization===2) {
    const allDemandesOfDepartement =await Demande.find({departementId: departementId})
    res.status(200).send(allDemandesOfDepartement)
  }else {
    throw new BRError('you must be a director of a departement')
  }
})



export {router as getDemandesDep}