import React, { useState } from "react";
import styles from "../profile.module.css"
import employeStyle from "../employe/employe.module.css";
import axios from 'axios'
import DirectorAchatLeftNav from "../../../component.js/leftNav/DirectorAchatLeftNav";
import AchatLeftNav from "../../../component.js/leftNav/AchatLeftNav";


const DemandeAchatCreate = () => {

  const [title, setTitle] = useState('')
  const [done, setDone] = useState('')

  const createDemand = async(event) => {
    event.preventDefault()

    try {
      const response = await axios.post("/api/demandes/create", {
        title
      })
      setTitle('')
      setDone('demand added successfully, you should now add items to it.')
      console.log(response)
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
            create a new demand
          </div>
          <form className={employeStyle.createUser_form}>
            <div className={employeStyle.personnal_infromation_1}>
              <input value={title} onChange={e=> setTitle(e.target.value)} placeholder="title of the demand" className={employeStyle.input} type="text" name="demande-achat" required />
            </div>
            <div className={employeStyle.add_user_from_button}>
              <button type="reset" className="btn btn-secondary">reset</button>
              <button onClick={createDemand} className="btn btn-primary">next</button>
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

export default DemandeAchatCreate