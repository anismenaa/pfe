import express from 'express'
import { currentUser, requireAuth } from '@anismenaapfeesi/common-api'
import { Demande } from '../model/demande'

const router = express.Router()

// we need to get the authentificated user
router.get('/api/demandes/', currentUser, requireAuth, async (req, res) => {
    const allDemandes = await Demande.find({})

    res.status(200).send(allDemandes)
})

export { router as demandeGetAllRouter }