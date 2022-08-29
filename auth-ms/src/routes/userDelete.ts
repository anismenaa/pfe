import { BRError, currentUser, requireAuth } from "@anismenaapfeesi/common-api"
import express from "express"
import { User } from "../model/user"


const router = express.Router()

router.delete('/api/users/delete/:id', currentUser,requireAuth, async(req, res) => {
  const id = req.params.id


  const userExists = await User.findById(id)
  if(!userExists) {
    throw new BRError('user with this id does not exists')
  }

  userExists.deleteOne()
    .then(()=> {
      return res.status(200).send('user deleted successfully')
    })
    .catch(()=> {
      throw new Error('an error occured while deleting this user')
    })

 
})


export {router as deleteUser}