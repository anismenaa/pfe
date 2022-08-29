import React, { useEffect, useState } from "react";
import styles from "../profile.module.css"
import viewer from "./viewer.module.css"
import EmployeLeftNav from "../../../component.js/leftNav/EmployeLeftNav";
import employeStyle from "./employe.module.css"
import axios from "axios";

import { generateDemandeAchatPdf } from "../../../component.js/printPdf/demandeAchatPrint";





const DemandeViewer = () => {
  const [demandeId, setIdDemande] = useState('')
  const [demande, setDemande] = useState('')
  const [items, setItems] = useState([])

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
    const uri = "https://pfe.dev/api/demandes/"+id
    const response = await axios.get(uri)
    setDemande(response.data)

    console.log(response.data)
  }
  // get the items
  const getAllItems = async(id) => {
    try {
      const uri = "https://pfe.dev/api/items/"+id
      const response = await axios.get(uri)
      setItems(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    setIdDemande(getQueryParams(window.location.search).idDemand)
    getDemande(getQueryParams(window.location.search).idDemand)
    getAllItems(getQueryParams(window.location.search).idDemand)
  })

  const displayFinaliseButton = () => {
    if (demande.finalised === false) {
      return(
        <div>
          <button onClick={async()=>{
            try {
              const uri = "/api/demandes/finalise/"+demande.id
              console.log(uri)
              const response = await axios.put(uri)
              console.log("demande finalised successfully")
            } catch (error) {
              console.log(error)
            }
          }}  className="btn btn-success w-30">finalise</button>
        </div>
      )
    }
  }

  const displayPrintButton = () => {
    if(demande.finalised){
      return(
        <div>
          <button onClick={()=>generateDemandeAchatPdf(demande, items)} className="btn btn-light w-30">print</button>
        </div>
      )
    }
  }

  return(
    <div className={styles.profile}>
      <div className={styles.leftSection}>
        <EmployeLeftNav />
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
              <p>demande Id : {demande.id}</p>
          </div>
        </div>
        <div className={viewer.buttons}>
            {displayFinaliseButton()}
            {displayPrintButton()}
        </div>
      </div>
    </div>
  )
}

export default DemandeViewer