import express from 'express'
import { currentUser, requireAuth } from '@anismenaapfeesi/common-api'
import { Demande } from '../model/demande'

const router = express.Router()

// we need to get the authentificated user
router.get('/api/validation/toValidate', currentUser, requireAuth, async (req, res) => {
    const departementId = req.currentUser?.departementId
    const allDemandes = await Demande.find({departementId: departementId, validation_1:false, finalised: true})

    res.status(200).send(allDemandes)
})

export { router as toValidate }