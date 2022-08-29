import React, {useEffect, useState} from "react";
import styles from "../profile.module.css"
import AdminLeftNav from "../../../component.js/leftNav/AdminLeftNav";
import adminStyle from "./css/createUser.module.css"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import axios from "axios";

const Admin_get_departements = () => {
  const [departements, setDepartements] = useState([])
  const [emailUser, setEmailUser] = useState('')
  const [departementUser, setDepartementUser] = useState('')

  const getMeCurrentUser = async() => {
    const currentUser = await axios.get("https://pfe.dev/api/users/currentUser")
    setEmailUser(currentUser.data.currentUser.email)
    setDepartementUser(currentUser.data.currentUser.departementId)
  }
  // let's get all the departements
  const getAllDepartements = async() => {
    try {
      const response = await axios.get('/api/departements/')
      setDepartements(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    getAllDepartements()
    getMeCurrentUser()
  })
  return(
    <div className={styles.profile}>
      <div className={styles.leftSection}>
        <AdminLeftNav email={emailUser} departement={departementUser} />
      </div>
      <div className={adminStyle.rightSection}>
        <table className="table table-dark">
          <thead className="thead-dark">
            <tr>
              <th>id departement</th>
              <th>name of departement</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {departements.map(dep => {
              return(
                <tr scope="row">
                  <td>{dep.id}</td>
                  <td>{dep.name}</td> 
                  <td><button className="btn btn-danger">delete</button><button className="btn btn-info">update</button></td>
                </tr>
              )
            })}
            
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Admin_get_departements