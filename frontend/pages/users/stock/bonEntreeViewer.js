import React, { useEffect, useState } from "react";
import styles from "../profile.module.css"
import viewer from "../employe/viewer.module.css"
import EmployeLeftNav from "../../../component.js/leftNav/EmployeLeftNav";
import employeStyle from "../employe/employe.module.css"
import axios from "axios";
import DirectorAchatLeftNav from "../../../component.js/leftNav/DirectorAchatLeftNav";
import AchatLeftNav from "../../../component.js/leftNav/AchatLeftNav";
import { generateBonEntreePdf } from "../../../component.js/printPdf/bonEntreePrint";
import StockLeftNav from "../../../component.js/leftNav/StockLeftNav";

const BeViewer = () => {
  const [be, setBe] = useState('')
  const [items, setItems] = useState([])
  const total = 0

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
  const getBe = async(id) => {
    const uri = "/api/achats/bon_entree/"+id
    const response = await axios.get(uri)
    setBe(response.data)
    
  }
  // get the items
  const getAllItems = async(id) => {
    try {
      const uri = "https://pfe.dev/api/achats/items/"+id
      const response = await axios.get(uri)
      setItems(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    getBe(getQueryParams(window.location.search).idBonEntree)
    getAllItems(getQueryParams(window.location.search).idBonEntree)
  },[be])



  const displayvalidateButton = () => {
    if (be.validate_BE === false) {

      return(
        <div>
          <button onClick={async()=>{
            try {
              const uri = "/api/achats/bon_entree/validate/"+be.id
              console.log(uri)
              const response = await axios.put(uri)
              console.log("be validated successfully")
            } catch (error) {
              console.log(error)
            }
          }}  className="btn btn-success w-30">validate</button>
        </div>
      )
    }
  }

  const displayPrintButton = () => {
   
      return(
        <div>
          <button onClick={()=> generateBonEntreePdf(be, items, total)} className="btn btn-light w-30">print</button>
        </div>
      )
    
  }

  return(
    <div className={styles.profile}>
      <div className={styles.leftSection}>
        <StockLeftNav />
      </div>
      <div className={employeStyle.rightSection}>
        <div className={viewer.global}>
          <div className={viewer.header}>
            <img src="/images/demande_logo.png" alt="rail logistic logo" />
            <div className={viewer.header_information}>
              <p><strong>Departement : </strong>achat</p>
              <p><strong>Vendor : </strong>{be.vendor}</p>
            </div>
          </div>
          <div className={viewer.title_section}>
            <h2>Bon Entree :</h2>
          </div>
          <div className={viewer.items}>
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th>itemId</th>
                  <th>name</th>
                  <th>quantity</th>
                  <th>prix_unitaire</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => {    
                  // on calcule le total
                  total+=item.prix_unitaire      
                  return(
                    <tr scope="row">
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{(item.quantity).toString()}</td>
                      <td>{(item.prix_unitaire).toString()}</td>
                    </tr>               
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className={viewer.validation_section}>
              <p><strong>prix total : </strong>{JSON.stringify(total)}</p>
          </div>
          <div className={viewer.validation_section}>
              <p><strong>supply director : </strong>{JSON.stringify(be.validate_BE)}</p>
          </div>
          <div className={viewer.idDemande}>
              <p>bon entree Id : {be.id}</p>
          </div>
        </div>
        <div className={viewer.buttons}>
            {displayPrintButton()}
        </div>
      </div>
    </div>
  )
}

export default BeViewer