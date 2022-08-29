import React, {useEffect, useState} from "react";
import styles from "../profile.module.css"
import AdminLeftNav from "../../../component.js/leftNav/AdminLeftNav";
import adminStyle from "./css/createUser.module.css"
import axios from "axios";


const Admin_add_departement = () => {
  const [name, setName] = useState('')
  const [departementAdded, setDone] = useState('')
  const [error, setError] = useState('')
  const [emailUser, setEmailUser] = useState('')
  const [departementUser, setDepartementUser] = useState('')

  const addDepartement = async (event) => {
    event.preventDefault()

    // add a departement
    try {
      const response = await axios.post("https://pfe.dev/api/departements/create", {
        name
      })

      setDone('departement has been added successfully')

      setName('')
      setError('')
      
    } catch (error) {
      setDone('')
      setError(error.response.data.errors[0].message)
    }
    
  }

  const getMeCurrentUser = async() => {
    const currentUser = await axios.get("https://pfe.dev/api/users/currentUser")
    setEmailUser(currentUser.data.currentUser.email)
    setDepartementUser(currentUser.data.currentUser.departementId)
  }


  const messageAffichage = () => {
    if(error!='') {
      return(
        <div class="alert alert-danger" role="alert">
          {error}
        </div>
      )
    }
    if (departementAdded != '') {
      return(
        <div class="alert alert-success" role="alert">
          {departementAdded}
        </div>
      )
    }
  }

  useEffect(()=>{
    getMeCurrentUser()
  }, [])

  return(
    <div className={styles.profile}>
      <div className={styles.leftSection}>
        <AdminLeftNav email={emailUser} departement={departementUser} />
      </div>
      <div className={adminStyle.rightSection}>
        <div className={adminStyle.form_area}>
          <div className={adminStyle.createUSer_bigTitle}>
            create a new departement
          </div>
          <form className={adminStyle.createUser_form}>
            <div className={adminStyle.personnal_infromation_1}>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="name of the departement" className={adminStyle.input} type="text" name="departement" required />
            </div>
            <div className={adminStyle.add_user_from_button}>
              <button type="reset" className="btn btn-secondary">reset</button>
              <button onClick={addDepartement} type="submit" className="btn btn-primary">save</button>
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

export default Admin_add_departement