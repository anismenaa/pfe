import React, { useState } from "react";
import styles from "../profile.module.css"
import employeStyle from "../employe/employe.module.css";
import axios from 'axios'
import AchatLeftNav from "../../../component.js/leftNav/AchatLeftNav";


const DemandBonEntreeCreate = () => {

  const [done, setDone] = useState('')
  const [vendor, setVendor] = useState('')

  const createBonEntree = async(event) => {
    event.preventDefault()
    try {
      const response = await axios.post('https://pfe.dev/api/achats/bon_entree/create/', {
        vendor
      })
      setDone("bon entree added successfully")
      setVendor('')
    } catch (error) {
      console.log(error)
    }
  }


  const messageAffichage = () => {
    console.log(done)
    if(done!='') {
      return(
        <div class="alert alert-success" role="alert">
          {done}
        </div>
      )
    }
  }

  return(
    <div className={styles.profile}>
      <div className={styles.leftSection}>
        <AchatLeftNav />
      </div>
      <div className={employeStyle.rightSection}>
        <div className={employeStyle.form_area}>
          <div className={employeStyle.createUSer_bigTitle}>
            create a new Bon Entree
          </div>
          <form className={employeStyle.createUser_form}>
            <div className={employeStyle.personnal_infromation_1}>
              <input value={vendor} onChange={e=> setVendor(e.target.value)} placeholder="vendor" className={employeStyle.input} type="text" name="bon-entree" required />
            </div>
            <div className={employeStyle.add_user_from_button}>
              <button type="reset" className="btn btn-secondary">reset</button>
              <button onClick={createBonEntree} className="btn btn-primary">next</button>
            </div>
          </form>
        </div>
        <div>
          {messageAffichage()}
        </div>
      </div>
    </div>
  )
}

export default DemandBonEntreeCreate