import { currentUser, requireAuth } from "@anismenaapfeesi/common-api"
import express from "express"
import { User } from "../model/user"


const router = express.Router()

router.get('/api/users/getAllUsers', currentUser,requireAuth, async(req, res) => {
  const response = await User.find({})

  return res.status(200).send(response)
})


export {router as getAllUsers}