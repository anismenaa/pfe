import React, {useState, useEffect} from "react";
import styles from "./leftnav.module.css"
import Item from "./Item";
import axios from "axios"
import Router from "next/router"

const StockLeftNav = () => {
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
        <Item path="/users/stock/create-bon-sortie" title="create bon sortie" />
        <Item path="/users/stock/bons-sorties-inProcess" title="bons sorties in process" />
        <Item path="/users/stock/bons-sorties-finalised" title="bons sorties final" />
        <Item path="/users/stock/bons-entrees" title="bons entrees finals" />
        <Item path="/users/stock/demandes-achats" title="demandes achats finales" />
      </div>
      <div className={styles.signoutSection}>
        <button onClick={signout} className="btn btn-secondary w-50">signout</button>
      </div>
    </div>
  )

}

export default StockLeftNav