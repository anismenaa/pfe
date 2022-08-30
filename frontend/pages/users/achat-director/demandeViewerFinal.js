import React, { useEffect, useState } from "react";
import styles from "../profile.module.css"
import viewer from "../employe/viewer.module.css"
import employeStyle from "../employe/employe.module.css"
import axios from "axios";
import { generateDemandeAchatDocumentPdf } from "../../../component.js/printPdf/demandeAchatDocuments";
import AchatLeftNav from "../../../component.js/leftNav/AchatLeftNav";
import DirectorAchatLeftNav from "../../../component.js/leftNav/DirectorAchatLeftNav";

const DemandeViewer = () => {
  const [demande, setDemande] = useState('')
  const [items, setItems] = useState([])
  const [demandeId, setDemandeId] = useState('')

  const getQueryParams = query => {
    return query
        ? (/^[?#]/.test(query) ? query.slice(1) : query)
            .split('&')
            .reduce((params, param) => {
                    let [key, value] = param.split('=');
                    params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
                    return params;
                }, {}
            )
        : {}
  };

  // get the demande
  const getDemande = async(id) => {
    try {
      const uri = "/api/document/demande_achat/"+id
      const response = await axios.get(uri)
      setDemande(response.data)
      setItems(response.data.items)
      setDemandeId(id)

      console.log(response.data)
    } catch (error) {
      
    }
  }


  useEffect(()=> {
    getDemande(getQueryParams(window.location.search).idDemand)
  }, [])


  return(
    <div className={styles.profile}>
      <div className={styles.leftSection}>
        <DirectorAchatLeftNav />
      </div>
      <div className={employeStyle.rightSection}>
        <div className={viewer.global}>
          <div className={viewer.header}>
            <img src="/images/demande_logo.png" alt="rail logistic logo" />
            <div className={viewer.header_information}>
              <p><strong>Date : </strong>{demande.date_creation}</p>
              <p><strong>From : </strong>{demande.userId}</p>
              <p><strong>Departement : </strong>{demande.departementId}</p>
            </div>
          </div>
          <div className={viewer.title_section}>
            <h2>Object : <span className={viewer.title}>{demande.title}</span></h2>
          </div>
          <div className={viewer.items}>
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th>itemId</th>
                  <th>name</th>
                  <th>quantity</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => {               
                  return(
                    <tr scope="row">
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{(item.quantity).toString()}</td>
                    </tr>               
                  )
                })}
              </tbody>
            </table> 
          </div>
          <div className={viewer.validation_section}>
              <p><strong>director of the departement : </strong>{JSON.stringify(demande.validation_1) }</p>
              <p><strong>supply director : </strong>{JSON.stringify(demande.validation_2)}</p>
          </div>
          <div className={viewer.idDemande}>
              <p>demande Id : {demandeId}</p>
          </div>
        </div>
        <div className={viewer.buttons}>
          <div>
            <button onClick={()=> generateDemandeAchatDocumentPdf(demande, items)} className="btn btn-light w-30">print</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DemandeViewer