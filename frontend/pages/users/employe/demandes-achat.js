import React, { useEffect, useState } from "react";
import styles from "../profile.module.css"
import EmployeLeftNav from "../../../component.js/leftNav/EmployeLeftNav";
import employeStyle from "./employe.module.css"
import axios from "axios";
import viewDemande from "./view-demande";
import Link from "next/link";

const DemandeAchat = () => {
  const [demandes, setDemandes] = useState([])

  const getAllDemandes = async() => {
    try {
      const response = await axios.get('/api/demandes/')
      setDemandes(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getAllDemandes()
  }, [])

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
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {demandes.map(demande => {
              
                return(
                
                  <tr scope="row">
                    <td>{demande.id}</td>
                    <td>{demande.title}</td>
                    <td>{(demande.finalised).toString()}</td>
                    <td>
                      <Link href={{ pathname: '/users/employe/view-demande', query: { idDemand: demande.id } }}>
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

export default DemandeAchat