import React, { useEffect, useState } from "react";
import styles from "../profile.module.css"
import DirectorAchatLeftNav from "../../../component.js/leftNav/DirectorAchatLeftNav";
import DirectorLeftNav from "../../../component.js/leftNav/DirectorLeftNav";
import directorStyle from "./director.module.css"
import axios from "axios";

const Employes = () => {

  
  const [currentUser, setCurrentUser] = useState('')
  const [employes, setEmployes] = useState([])
  
  const getMeCurrentUser = async() => {
    try {
      const response = await axios.get('/api/users/currentUser')
      setCurrentUser(response.data.currentUser)
      console.log(response.data.currentUser)
    } catch (error) {
      console.log(error)
    }
  }

  const getAllEmployesDep = async() =>{
    const departementId = currentUser.departementId
    try {
      const uri = "https://pfe.dev/api/users/"+departementId
      const response = await axios.get(uri)
      setEmployes(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    getMeCurrentUser()
    getAllEmployesDep()
  })
  return(
    <div className={styles.profile}>
      <div className={styles.leftSection}>
        <DirectorLeftNav />
      </div>
      <div className={directorStyle.rightSection}>
      <table className="table table-dark">
          <thead className="thead-dark">
            <tr>
              <th>full name</th>
              <th>email</th>
              <th>departement</th>
              <th>role</th>
            </tr>
          </thead>
          <tbody>
            {employes.map(user => {
            
              return(
               
                <tr scope="row">
                  <td>{user.name} {user.surname}</td>
                  <td>{user.email}</td>
                  <th>{user.departementId}</th>
                  <th>{user.authorization}</th>
                </tr>
             
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Employes