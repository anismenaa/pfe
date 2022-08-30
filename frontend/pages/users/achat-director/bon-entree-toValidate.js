import React, {useState, useEffect} from "react";
import styles from "../profile.module.css"
import DirectorAchatLeftNav from "../../../component.js/leftNav/DirectorAchatLeftNav";
import axios from "axios";
import directorStyle from "../director/director.module.css"
import Link from "next/link";

const ToValidateBE = () => {
  const [currentUser, setCurrentUser] = useState('')
  const [toValidate, setToValidate] = useState([])

  const getMeBonEntreeToValidate = async() => {
    try {
      const response = await axios.get('/api/achats/be-to-validate')
      console.log(response.data)
      setToValidate(response.data)
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(()=> {
   // getMeCurrentUser()
    getMeBonEntreeToValidate()
  }, [])
  return(
    <div className={styles.profile}>
      <div className={styles.leftSection}>
        <DirectorAchatLeftNav />
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
              {toValidate.map(be => {
              
                return(
                
                  <tr scope="row">
                    <td>{be.id}</td>
                    <td>{be.vendor}</td>
                    <td>{(be.validate_BE).toString()}</td>
                    <td>
                      <Link href={{ pathname: '/users/achat-director/bonEntreeViewer', query: { idBonEntree: be.id } }}>
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

export default ToValidateBE