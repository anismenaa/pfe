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
  }, [])
  return(
    <div className={styles.leftNav}>
      <img className={styles.profilepic} src="/images/avatar.jpg" alt="user image" />
      <div className={styles.userInformation}>
        <div className={styles.userEmail}>{email}</div>
        <div className={styles.userDepartement}>{departement}</div>
      </div>
      <div className={styles.menuItem}>
        <Item path="/users/achat-director/employes" title="employees" />
        <Item path="/users/achat-director/mes-demandes-achats" title="mes demandes achats" />
        <Item path="/users/achat-director/bonEntreesValidated" title="bon entrees" />
        <Item path="/users/achat-director/toValidate" title="to validate" />
        <Item path="/users/achat-director/bon-entree-toValidate" title="validate BE" />
        <Item path="/users/achat-director/create-demande-achat" title="create demande achat" />
        <Item path="/users/achat-director/demandes-achats" title="demandes achats" />
      </div>
      <div className={styles.signoutSection}>
        <button onClick={signout} className="btn btn-secondary w-50">signout</button>
      </div>
    </div>
  )

}

export default DirectorAchatLeftNav