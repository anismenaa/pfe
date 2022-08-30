import React, { useEffect, useState } from "react";
import styles from "../profile.module.css"
import employeStyle from "../employe/employe.module.css"
import axios from "axios";
import Link from "next/link";
import DirectorLeftNav from "../../../component.js/leftNav/DirectorLeftNav";
import DirectorAchatLeftNav from "../../../component.js/leftNav/DirectorAchatLeftNav";
import AchatLeftNav from "../../../component.js/leftNav/AchatLeftNav";

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
        <AchatLeftNav />
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
                      <Link href={{ pathname: '/users/achat/view-demande', query: { idDemand: demande.id } }}>
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