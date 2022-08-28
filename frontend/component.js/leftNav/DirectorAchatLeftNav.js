import React, {useEffect, useState} from "react";
import styles from "./leftnav.module.css"
import Item from "./Item";
import axios from "axios"
import Router from "next/router"

const DirectorAchatLeftNav = () => {
  const [email, setEmail] = useState('')
  const [departement, setDepartement] = useState('')

  const signout = () => {
    axios.post("https://pfe.dev/api/users/signout")
      .then(() => {
        console.log('signout successfully')
        Router.push('/')
      })
  }

  const getMeCurrentUser = async() => {
    const currentUser = await axios.get("https://pfe.dev/api/users/currentUser")
    console.log(currentUser)
    setEmail(currentUser.data.currentUser.email)
    setDepartement(currentUser.data.currentUser.departementId)
  }

  useEffect(()=> {
    getMeCurrentUser()
  })
  return(
    <div className={styles.leftNav}>
      <img className={styles.profilepic} src="/images/avatar.jpg" alt="user image" />
      <div className={styles.userInformation}>
        <div className={styles.userEmail}>{email}</div>
        <div className={styles.userDepartement}>{departement}</div>
      </div>
      <div className={styles.menuItem}>
        <Item path="/mazal" title="employees" />
        <Item path="/mazal" title="demandes achats" />
        <Item path="/mazal" title="bon entrees" />
        <Item path="/mazal" title="to validate" />
        <Item path="/mazal" title="create bon entree" />
        <Item path="/mazal" title="create demande achat" />
      </div>
      <div className={styles.signoutSection}>
        <button onClick={signout} className="btn btn-secondary w-50">signout</button>
      </div>
    </div>
  )

}

export default DirectorAchatLeftNav