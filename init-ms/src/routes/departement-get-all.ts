import express from 'express'
import { requireAuth, BRError } from '@anismenaapfeesi/common-api'
import { Departement } from '../model/departement'

const router = express.Router()

// we need to get the authentificated user
router.get('/api/departements/', requireAuth, async (req, res) => {
  if(req.currentUser?.authorization===1) {
    const allDepartements = await Departement.find({})

    res.status(200).send(allDepartements)
  }
  throw new BRError('this is handled only by admins')
})

export { router as departementGetAllRouter }