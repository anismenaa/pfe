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
import { generateBonSortiePdf } from "../../../component.js/printPdf/bonSortiePrint";

const BsViewer = () => {
  const [bs, setBs] = useState('')
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
  const getBs = async(id) => {
    const uri = "/api/document/bon_sortie/"+id
    const response = await axios.get(uri)
    setBs(response.data)
    setItems(response.data.items)
  }
  

  useEffect(()=> {
    getBs(getQueryParams(window.location.search).idBonSortie)
  },[])


  const displayPrintButton = () => {
    
      return(
        <div>
          <button onClick={()=> generateBonSortiePdf(bs, items)} className="btn btn-light w-30">print</button>
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
              <p><strong>Departement : </strong>stockage</p>
              <p><strong>destination : </strong>{bs.departementId}</p>
            </div>
          </div>
          <div className={viewer.title_section}>
            <h2>Bon Sortie :</h2>
          </div>
          <div className={viewer.items}>
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th>itemId/name</th>
                  <th>quantity</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => {    
                  // on calcule le total   
                  return(
                    <tr scope="row">
                      <td>{item.name}</td>
                      <td>{(item.quantity).toString()}</td>
                    </tr>               
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className={viewer.validation_section}>
              <p><strong>signature : </strong>{JSON.stringify(bs.finalised)}</p>
          </div>
          <div className={viewer.idDemande}>
              <p>bon sortie Id : {bs.id}</p>
          </div>
        </div>
        <div className={viewer.buttons}>
            {displayPrintButton()}
        </div>
      </div>
    </div>
  )
}

export default BsViewer