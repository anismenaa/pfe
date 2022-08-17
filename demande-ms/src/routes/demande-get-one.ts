import express from 'express'
import { currentUser, requireAuth } from '@anismenaapfeesi/common-api'
import { Demande } from '../model/demande'

const router = express.Router()

// we need to get the authentificated user
router.get('/api/demandes/:id', currentUser, requireAuth, async (req, res) => {
    const maDemande = await Demande.findById(req.params.id)

    res.status(200).send(maDemande)
})

export { router as demandeGetOneRouter }