import React, {useState, useEffect} from "react";
import styles from "../profile.module.css"
import DirectorAchatLeftNav from "../../../component.js/leftNav/DirectorAchatLeftNav";
import axios from "axios";
import directorStyle from "../director/director.module.css"
import Link from "next/link";
import StockLeftNav from "../../../component.js/leftNav/StockLeftNav";

const bonsEntreesFinal = () => {
  const [currentUser, setCurrentUser] = useState('')
  const [bonEntrees, setBonEntrees] = useState([])

  const getMeBonEntreesFinal = async() => {
    try {
      const response = await axios.get('/api/document/bon_entree/getAll')
      console.log(response.data)
      setBonEntrees(response.data)
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(()=> {
   // getMeCurrentUser()
   getMeBonEntreesFinal()
  }, [])
  return(
    <div className={styles.profile}>
      <div className={styles.leftSection}>
        <StockLeftNav />
      </div>
      <div className={directorStyle.rightSection}>
      <table className="table table-dark">
            <thead className="thead-dark">
              <tr>
                <th>bon entree Id</th>
                <th>vendor</th>
                <th>validated</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {bonEntrees.map(be => {
              
                return(
                
                  <tr scope="row">
                    <td>{be.bonEntreeId}</td>
                    <td>{be.vendor}</td>
                    <td>{(be.validate_BE).toString()}</td>
                    <td>
                      <Link href={{ pathname: '/users/stock/bonEntreeViewer', query: { idBonEntree: be.bonEntreeId } }}>
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

export default bonsEntreesFinal