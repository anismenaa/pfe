import React, { useEffect, useState } from "react";
import styles from "../profile.module.css"
import employeStyle from "../employe/employe.module.css"
import axios from "axios";
import Link from "next/link";
import AchatLeftNav from "../../../component.js/leftNav/AchatLeftNav";
import StockLeftNav from "../../../component.js/leftNav/StockLeftNav";

const DemandesAchats = () => {
  const [demandes, setDemandes] = useState([])

  const getAllDemandes = async() => {
    try {
      const response = await axios.get('/api/document/demande_achat/getAll')
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
        <StockLeftNav />
      </div>
      <div className={employeStyle.rightSection}>
        <table className="table table-dark">
            <thead className="thead-dark">
              <tr>
                <th>title</th>
                <th>userId</th>
                <th>departementId</th>
                <th>finalised</th>
                <th>validation 1</th>
                <th>validation 2</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {demandes.map(demande => {

                return(
                  <tr scope="row">
                    <td>{demande.title}</td>
                    <td>{demande.userId}</td>
                    <td>{demande.departementId}</td>
                    <td>{(demande.finalised).toString()}</td>
                    <td>{(demande.validation_1).toString()}</td>
                    <td>{(demande.validation_2).toString()}</td>
                    <td>
                      <Link href={{ pathname: '/users/stock/demandeViewerFinal', query: { idDemand: demande.demandeId } }}>
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

export default DemandesAchats