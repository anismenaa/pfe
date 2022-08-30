import React, { useEffect, useState } from "react";
import styles from "../profile.module.css"
import employeStyle from "../employe/employe.module.css"
import axios from "axios";
import Link from "next/link";
import AchatLeftNav from "../../../component.js/leftNav/AchatLeftNav";
import DirectorAchatLeftNav from "../../../component.js/leftNav/DirectorAchatLeftNav";
import StockLeftNav from "../../../component.js/leftNav/StockLeftNav";

const BonSortiesInProcess = () => {
  const [bonSorties, setBonSorties] = useState([])

  const getAllBonSorties = async() => {
    try {
      const response = await axios.get('/api/stock/bon_sortie/')
      setBonSorties(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteBs = async(id)=>{
    await axios.delete('/api/stock/bon_sortie/delete/'+id)
      .then(()=> {
        console.log('bs deleted succ')
      })
      .catch(()=>{
        console.log('error while deleting bs')
      })
  }

  useEffect(()=>{
    getAllBonSorties()
  }, [bonSorties])

  return(
    <div className={styles.profile}>
      <div className={styles.leftSection}>
        <StockLeftNav />
      </div>
      <div className={employeStyle.rightSection}>
        <table className="table table-dark">
            <thead className="thead-dark">
              <tr>
                <th>departement destination</th>
                <th>date</th>
                <th>finalised</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {bonSorties.map(bs => {

                return(
                  <tr scope="row">
                    <td>{bs.departementId}</td>
                    <td>{bs.date_sortie}</td>
                    <td>{(bs.finalised).toString()}</td>
                    <td>
                      <button onClick={()=>deleteBs(bs.id)} className="btn btn-danger">delete</button>
                      <Link href={{ pathname: '/users/stock/view-bon-sortie', query: { idBonSortie: bs.id } }}>
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

export default BonSortiesInProcess