import React, {useEffect, useState} from "react";
import styles from "./leftnav.module.css"
import Item from "./Item";
import axios from "axios"
import Router from "next/router"

const AchatLeftNav = () => {
  const [email, setEmail] = useState('')
  const [departement, setDepartement] = useState('')

  const signout = () => {
    axios.post("https://pfe.dev/api/users/signout")
      .then(() => {
        console.log('signout successfully')
        Router.push('/')
      })
  }

 
  return(
    <div className={styles.leftNav}>
      <img className={styles.profilepic} src="/images/avatar.jpg" alt="user image" />
      <div className={styles.userInformation}>
        <div className={styles.userEmail}>{email}</div>
        <div className={styles.userDepartement}>{departement}</div>
      </div>
      <div className={styles.menuItem}>
        <Item path="/mazal" title="bons entrees" />
        <Item path="/mazal" title="mes demandes achats" />       
        <Item path="/mazal" title="demandes achats validated" />
        <Item path="/mazal" title="create bon entree" />
        <Item path="/mazal" title="create demande achat" />
      </div>
      <div className={styles.signoutSection}>
        <button onClick={signout} className="btn btn-secondary w-50">signout</button>
      </div>
    </div>
  )

}

export default AchatLeftNav