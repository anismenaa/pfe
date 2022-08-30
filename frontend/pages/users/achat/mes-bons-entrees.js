import React, { useEffect, useState } from "react";
import styles from "../profile.module.css"
import employeStyle from "../employe/employe.module.css"
import axios from "axios";
import Link from "next/link";
import AchatLeftNav from "../../../component.js/leftNav/AchatLeftNav";

const BonEntree = () => {
  const [bonEntrees, setBonEntree] = useState([])

  const getAllBonEntrees = async() => {
    try {
      const response = await axios.get('/api/achats/bon_entree/all')
      setBonEntree(response.data)
      
    } catch (error) {
      console.log(error)
    }
  }

  const deleteBe = async(id) => {
    try {
      const response = await axios.delete('/api/achats/bon_entree/delete/'+id)
      console.log("be deleted successfully")
    } catch (error) {
      console.log(error)
    }
  }

  const displaydeleteBtn = (be) => {
    if(!be.validate_BE) {
      return <button onClick={()=> deleteBe(be.id)} className="btn btn-danger">delete</button>
    }
  }
  useEffect(()=>{
    getAllBonEntrees()
  }, [bonEntrees])

  return(
    <div className={styles.profile}>
      <div className={styles.leftSection}>
        <AchatLeftNav />
      </div>
      <div className={employeStyle.rightSection}>
        <table className="table table-dark">
            <thead className="thead-dark">
              <tr>
                <th>bon entree id</th>
                <th>vendor</th>
                <th>total en dinar</th>
                <th>validate</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {bonEntrees.map(be => {

                return(
                  <tr scope="row">
                    <td>{be.id}</td>
                    <td>{be.vendor}</td>
                    <td>{be.total}</td>
                    <td>{(be.validate_BE).toString()}</td>
                    <td>
                      {displaydeleteBtn(be)}
                      <Link href={{ pathname: '/users/achat/view-bon-entree', query: { idBe: be.id } }}>
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

export default BonEntree