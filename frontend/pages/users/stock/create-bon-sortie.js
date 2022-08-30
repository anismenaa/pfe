import React, { useEffect, useState } from "react";
import styles from "../profile.module.css"
import employeStyle from "../employe/employe.module.css";
import axios from 'axios'
import DirectorAchatLeftNav from "../../../component.js/leftNav/DirectorAchatLeftNav";
import AchatLeftNav from "../../../component.js/leftNav/AchatLeftNav";
import StockLeftNav from "../../../component.js/leftNav/StockLeftNav";


const BonSortieCreate = () => {

  const [departementId, setDepartementId] = useState('')
  const [done, setDone] = useState('')
  const [departements, setDepartements] = useState([])

  const createBonSortie = async(event) => {
    event.preventDefault()

    try {
      const response = await axios.post("/api/stock/bon_sortie/create", {
        departementId
      })
      setDepartementId('')
      setDone('bon sortie added successfully.')
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  //get the departement
  const getAllDepartements = async() => {
    try {
      const response = await axios.get('/api/departements/')
      console.log(response)
      setDepartements(response.data)
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

  useEffect(()=> {
    getAllDepartements()
  },[])

  return(
    <div className={styles.profile}>
      <div className={styles.leftSection}>
        <StockLeftNav />
      </div>
      <div className={employeStyle.rightSection}>
        <div className={employeStyle.form_area}>
          <div className={employeStyle.createUSer_bigTitle}>
            create a new bonSortie
          </div>
          <form className={employeStyle.createUser_form}>
            <select name="departements" placeholder="departement" onChange={e => setDepartementId(e.target.value)}>
              <option disabled selected>select the departement</option>
              {departements.map(dep => {
                return(
                  <option value={dep.id}>{dep.name}</option>
                )
              })}
            </select>
            <div className={employeStyle.add_user_from_button}>
              <button type="reset" className="btn btn-secondary">reset</button>
              <button onClick={createBonSortie} className="btn btn-primary">next</button>
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

export default BonSortieCreate