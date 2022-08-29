import React, { useEffect, useState } from "react";
import styles from "../profile.module.css"
import EmployeLeftNav from "../../../component.js/leftNav/EmployeLeftNav";
import employeStyle from "../employe/employe.module.css"
import axios from "axios";
import Link from "next/link";
import DirectorLeftNav from "../../../component.js/leftNav/DirectorLeftNav";

const viewDemande = () => {
  const [idDemande, setIdDemande] = useState('')
  const [demande, setDemande] = useState('')
  const [items, setItems] = useState([])

  const [quantity, setQuantity] = useState('')
  const [name, setName] = useState('')


  const deleteItem = async (id)=> {
    try {
      const uri = "https://pfe.dev/api/items/"+id
      const response = await axios.delete(uri)
      console.log("item deleted successfully")
    } catch (error) {
      console.log("an error occured while deleting the item")
    }
  }

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

  // get all the items of the demandeID

  const getDemande = async() => {
    const uri = "https://pfe.dev/api/demandes/"+idDemande
    const response = await axios.get(uri)
    setDemande(response.data)
  }

  const getAllItems = async() => {
    try {
      const uri = "https://pfe.dev/api/items/"+idDemande
      const response = await axios.get(uri)
      setItems(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const additem = async(e) => {
    e.preventDefault()
    try {
      const uri = "https://pfe.dev/api/items/create/"+idDemande 
      const response = await axios.post(uri, {
        name, quantity
      })
      console.log("uri :", uri)
      console.log(response)
      setName('')
      setQuantity('')
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=> {
    setIdDemande(getQueryParams(window.location.search).idDemand)
    getDemande()
    getAllItems()
  })

  const addItemform = () => {
   // get the demande
   if(demande.finalised === false) {
    return(
      <div className={employeStyle.formitem_area}>
        <form className={employeStyle.createItem_form}>
          <div className={employeStyle.personnal_infromation_1}>
            <input value={name} onChange={e=> setName(e.target.value)} placeholder="name of the item" className={employeStyle.input} type="text" name="item" required />
            <input value={quantity} onChange={e=> setQuantity(e.target.value)} placeholder="quantity" className={employeStyle.input} type="number" name="quantity" required />
            <button onClick={additem} className="btn btn-primary">add</button>
          </div>
        </form>
      </div>
    )
   }
  }
  return(
    <div className={styles.profile}>
      <div className={styles.leftSection}>
        <DirectorLeftNav />
      </div>
      <div className={employeStyle.rightSection}>
        <div className={employeStyle.demandeId}>
          demande Id: {idDemande}
        </div>
        <table className="table table-dark">
            <thead className="thead-dark">
              <tr>
                <th>itemId</th>
                <th>name</th>
                <th>quantity</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => {
              
                return(
                
                  <tr scope="row">
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{(item.quantity).toString()}</td>
                    <td>
                      <button onClick={()=>deleteItem(item.id)} className="btn btn-danger">delete</button>                      
                    </td>
                  </tr>
              
                )
              })}
            </tbody>
          </table>
          {addItemform()}
          <Link href={{ pathname: '/users/director/demandeViewer', query: { idDemand: idDemande} }}>
            <button className="btn btn-warning">visualise</button>
          </Link>
         </div>
    </div>
  )
}

export default viewDemande