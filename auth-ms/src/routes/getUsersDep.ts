import { currentUser, requireAuth } from "@anismenaapfeesi/common-api"
import express from "express"
import { User } from "../model/user"


const router = express.Router()

router.get('/api/users/:iddep', currentUser,requireAuth, async(req, res) => {
  
  const departementId = req.params.iddep

  
  const response = await User.find({departementId: departementId})

  return res.status(200).send(response)
})


export {router as getUsersDep}