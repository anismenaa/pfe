import React, { useEffect, useState } from "react";
import styles from "../profile.module.css"
import EmployeLeftNav from "../../../component.js/leftNav/EmployeLeftNav";
import employeStyle from "../employe/employe.module.css"
import axios from "axios";
import Link from "next/link";
import DirectorLeftNav from "../../../component.js/leftNav/DirectorLeftNav";
import DirectorAchatLeftNav from "../../../component.js/leftNav/DirectorAchatLeftNav";
import StockLeftNav from "../../../component.js/leftNav/StockLeftNav";

const viewBonSortie = () => {
  const [idBonSortie, setBonSortieId] = useState('')
  const [bonSortie, setBonSortie] = useState('')
  const [items, setItems] = useState([])
  const [itemsAll, setItemsAll] = useState([])
  const [quantity, setQuantity] = useState('')
  const [name, setName] = useState('')

  const [errors, setErrors] = useState([])

  const deleteItem = async (id)=> {
    try {
      const uri = "/api/stock/items/delete/"+id
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

  const getBonSortie = async(id) => {
    const uri = "/api/stock/bon_sortie/"+id
    const response = await axios.get(uri)
    setBonSortie(response.data)
  }

  const getAllItemsBs = async(id) => {
    try {
      const uri = "/api/stock/items/bon_sortie/"+id
      const response = await axios.get(uri)
      setItems(response.data)
    } catch (error) {
      console.log(error)
    }
  }


  const getAllItems = async(id) => {
    try {
      const uri = "/api/stock/items/"
      const response = await axios.get(uri)
      setItemsAll(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const additem = async(e) => {
    e.preventDefault()
    try {
      const uri = "/api/stock/item/create/"+idBonSortie 
      const response = await axios.post(uri, {
        itemId: name
        , quantity
      })
      console.log("uri :", uri)
      console.log(response)
      setName('')
      setQuantity('')
    } catch (error) {
      console.log(error)
      setErrors(error.response.data.errors)
    }
  }

  const displayErrorMessage = () => {
    <div class="alert alert-danger" role="alert">
      <ul>
        {errors.map(err=> {
          return(
            <li>{err.message}</li>
          )
        })}
      </ul>
    </div>
  }
  useEffect(()=> {
    setBonSortieId(getQueryParams(window.location.search).idBonSortie)
    getBonSortie(getQueryParams(window.location.search).idBonSortie)
    getAllItemsBs(getQueryParams(window.location.search).idBonSortie)
    getAllItems()
  }, [items, errors])

  const addItemform = () => {
   // get the demande
   if(bonSortie.finalised === false) {
    return(
      <div className={employeStyle.formitem_area}>
        <form className={employeStyle.createItem_form}>
          <div className={employeStyle.personnal_infromation_1}>
            <select name="items" placeholder="all items" onChange={e => setName(e.target.value)}>
              <option disabled selected>select the item</option>
              {itemsAll.map(item => {
                return(
                  <option value={item.id}>{item.name}</option>
                )
              })}
            </select>            
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
        <StockLeftNav />
      </div>
      <div className={employeStyle.rightSection}>
        <div className={employeStyle.demandeId}>
          bonSortie Id: {idBonSortie}
        </div>
        <table className="table table-dark">
            <thead className="thead-dark">
              <tr>
                <th>itemId</th>
                <th>quantity</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => {
              
                return(
                
                  <tr scope="row">
                    <td>{item.id}</td>
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
          <Link href={{ pathname: '/users/stock/bonSortieViewer', query: { idBonSortie: idBonSortie} }}>
            <button className="btn btn-warning">visualise</button>
          </Link>
         </div>
         {displayErrorMessage}
    </div>
  )
}

export default viewBonSortie