import React, {useState, useEffect} from "react";
import styles from "../profile.module.css"
import DirectorAchatLeftNav from "../../../component.js/leftNav/DirectorAchatLeftNav";
import DirectorLeftNav from "../../../component.js/leftNav/DirectorLeftNav";
import axios from "axios";
import directorStyle from "./director.module.css"
import Link from "next/link";

const ToValidate = () => {
  const [currentUser, setCurrentUser] = useState('')
  const [toValidate, setToValidate] = useState([])
/* 
  const getMeCurrentUser = async() => {
    try {
      const response = await axios.get('/api/users/currentUser')
      setCurrentUser(response.data.currentUser)
      console.log(response.data.currentUser)
    } catch (error) {
      console.log(error)
    }
  }
 */
  const getMeDemandeAchatToValidate = async() => {
    try {
      const response = await axios.get('/api/validation/toValidate')
      console.log(response.data)
      setToValidate(response.data)
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(()=> {
   // getMeCurrentUser()
    getMeDemandeAchatToValidate()
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
                <th>demandeId</th>
                <th>title</th>
                <th>validated</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {toValidate.map(demande => {
              
                return(
                
                  <tr scope="row">
                    <td>{demande.id}</td>
                    <td>{demande.title}</td>
                    <td>{(demande.validation_1).toString()}</td>
                    <td>
                      <Link href={{ pathname: '/users/director/view-demande', query: { idDemand: demande.id } }}>
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

export default ToValidate