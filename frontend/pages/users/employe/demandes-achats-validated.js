import React, { useEffect, useState } from "react";
import styles from "../profile.module.css"
import EmployeLeftNav from "../../../component.js/leftNav/EmployeLeftNav";
import employeStyle from "./employe.module.css"
import axios from "axios";
import Link from "next/link";
const demandesValidated = () => {
  const [demandes, setDemandes] = useState([])
  const [userId, setUserId] = useState('')


  const getMeCurrentUser = async() => {
    const currentUser = await axios.get("https://pfe.dev/api/users/currentUser")
    console.log(currentUser.data.currentUser.id)
    setUserId(currentUser.data.currentUser.id)
  }

  const getAllDemandes = async() => {
    try {
      const response = await axios.get('/api/document/demande_achat/perUser/'+userId)
      setDemandes(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(()=>{
    getMeCurrentUser()
    getAllDemandes()
  })
  return(
    <div className={styles.profile}>
      <div className={styles.leftSection}>
        <EmployeLeftNav />
      </div>
      <div className={employeStyle.rightSection}>
      <table className="table table-dark">
            <thead className="thead-dark">
              <tr>
                <th>demandeId</th>
                <th>title</th>
                <th>finalised</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {demandes.map(demande => {
              
                return(
                
                  <tr scope="row">
                    <td>{demande.demandeId}</td>
                    <td>{demande.title}</td>
                    <td>{(demande.finalised).toString()}</td>
                    <td>
                      <Link href={{ pathname: '/users/employe/view-demande', query: { idDemand: demande.demandeId } }}>
                        <button className="btn btn-info">view</button>
                      </Link>
                      
                    </td>
                  </tr>
              
                )
              })}
            </tbody>
          </table>
      </div>
    </div>
  )
}

export default demandesValidated