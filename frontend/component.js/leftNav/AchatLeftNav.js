import React, {useEffect, useState} from "react";
import styles from "./leftnav.module.css"
import Item from "./Item";
import axios from "axios"
import Router from "next/router"

const AchatLeftNav = () => {

  const [email, setEmail] = useState('')
  const [departement, setDepartementId] =useState('')

  const getMeCurrentUser = async()=> {
    try {
      const response = await axios.get('/api/users/currentUser')
      setEmail(response.data.currentUser.email)
      setDepartementId(response.data.currentUser.departementId)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    getMeCurrentUser()
  }, [])

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
        <Item path="/users/achat/create-bon-entree" title="create bon entree" />
        <Item path="/users/achat/create-demande-achat" title="create demande achat" />
        <Item path="/users/achat/mes-demandes-achats" title="mes demandes achats" />      
        <Item path="/users/achat/demandes-achats" title="Demandes Achat" />
        <Item path="/users/achat/mes-bons-entrees" title="Mes Bon Entrees" />       
      </div>
      <div className={styles.signoutSection}>
        <button onClick={signout} className="btn btn-secondary w-50">signout</button>
      </div>
    </div>
  )

}

export default AchatLeftNav