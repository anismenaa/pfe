import express from 'express'


import { currentUser, requireAuth } from '@anismenaapfeesi/common-api'


const router = express.Router()

router.get('/api/users/currentuser', currentUser, requireAuth, (req, res) => {
  return res.send({ currentUser: req.currentUser || null})
})

export {router as currentuserRouter}